import React, { Component } from "react";
import MovieForm from "../components/movieForm";

class MovieDetails extends Component {
  state = {};

  handleNav = () => {};
  render() {
    return (
      <React.Fragment>
        <h1>Movie from {this.props.match.params.id} </h1>
        <MovieForm {...this.props}></MovieForm>
      </React.Fragment>
    );
  }
}

export default MovieDetails;
