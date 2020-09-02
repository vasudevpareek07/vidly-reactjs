import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/moviesService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    movie: {},
    genres: [],
  };

  schema = {
    _id: Joi.string().allow("").optional(),
    title: Joi.string().required().min(5).label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().min(1).label("Stock"),
    dailyRentalRate: Joi.number().required().min(1).max(5).label("Rate"),
  };

  async componentDidMount() {
    await this.populateGenre();
    await this.populateMovie();
  }

  async populateGenre() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieID = this.props.match.params.id;
      if (movieID === "new") return;
      const { data: movie } = await getMovie(movieID);
      this.setState({ data: this.prefillData(movie) });
    } catch (e) {
      if (e.response && e.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  prefillData(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    const action = this.props.movieID ? "Update" : "Add";
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSingleSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton(action)}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
