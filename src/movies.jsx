import React, { Component } from "react";
import { getMovies, deleteMovie } from "./services/moviesService";
import { getGenres } from "./services/genreService";
import Pagination from "./pagination";
import Genre from "./genre";
import { paginate } from "./utils/paginate";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import Search from "./components/common/search";
import { toast } from "react-toastify";

class movies extends Component {
  state = {
    movies: [],
    pageSize: 3,
    currentPage: 1,
    allGenre: [],
    selectedGenre: { _id: "5b21ca3eeb7f6fbccd471825", name: "All Genre" },
    sortColumn: { column: "title", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const allGenreObj = { _id: "5b21ca3eeb7f6fbccd471825", name: "All Genre" };
    const allGenre = [allGenreObj, ...data];

    const { data: movies } = await getMovies();

    this.setState({ selectedGenre: allGenreObj });
    this.setState({ movies, allGenre });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (e) {
      if (e.response && e.response.status === 404)
        toast.error("This movie is already deleted!");

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const index = this.state.movies.indexOf(movie);
    const movies = [...this.state.movies];
    movies[index] = { ...movies[index] };
    movies[index].isFavourite = !movies[index].isFavourite;
    this.setState({ movies });
  };

  handlePagination = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  handleGenreChange = (changedGenre) => {
    this.setState({
      selectedGenre: changedGenre,
      searchQuery: "",
      currentPage: 1,
    });
  };

  handleSearch = (searchQuery) => {
    let selectedGenre = { ...this.state.selectedGenre };
    selectedGenre._id = "5b21ca3eeb7f6fbccd471825";
    selectedGenre.name = "All Genre";
    this.setState({ searchQuery, selectedGenre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData() {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filteredMovies;

    if (this.state.selectedGenre.name === "All Genre") {
      filteredMovies = [...allMovies];
    }

    if (!_.isEmpty(searchQuery)) {
      filteredMovies = allMovies.filter((m) => {
        return _.includes(m.title.toLowerCase(), searchQuery.toLowerCase());
      });
    } else if (this.state.selectedGenre.name !== "All Genre") {
      filteredMovies = allMovies.filter((movie) => {
        return movie.genre.name === selectedGenre.name;
      });
    }

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.column],
      [sortColumn.order]
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { count: filteredMovies.length, data: movies };
  }

  render() {
    const {
      pageSize,
      currentPage,
      allGenre,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    const { count, data: movies } = this.getPagedData();

    if (this.state.movies.length === 0)
      return <p>There are no Movies in the database</p>;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <Genre
              allGenre={allGenre}
              selectedGenre={selectedGenre}
              onGenreChange={this.handleGenreChange}
            ></Genre>
          </div>
          <div className="col">
            {this.props.user && (
              <NavLink className="nav-link" to="/movies/new">
                <button className="btn btn-md btn-primary mb-4" to="/login">
                  New Movie
                </button>
              </NavLink>
            )}

            <Search value={searchQuery} onChange={this.handleSearch}></Search>

            <p>Showing {count} Movies from the database</p>
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            ></MoviesTable>
            <br />
            <Pagination
              count={count}
              pageSize={pageSize}
              onPageChange={this.handlePagination}
              currentPage={currentPage}
            ></Pagination>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default movies;
