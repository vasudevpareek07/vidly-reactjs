import React, { Component } from "react";

class Genre extends Component {
  state = {};
  render() {
    return (
      <ul className="list-group">
        {this.props.allGenre.map((genre) => (
          <li
            key={genre._id}
            className={
              this.props.selectedGenre._id === genre._id
                ? "clickable list-group-item active"
                : "clickable list-group-item"
            }
            onClick={() => {
              this.props.onGenreChange(genre);
            }}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default Genre;
