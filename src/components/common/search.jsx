import React, { Component } from "react";

class Search extends Component {
  state = {};
  render() {
    return (
      <input
        type="text"
        className="form-control mb-3"
        value={this.props.value}
        onChange={(e) => this.props.onChange(e.currentTarget.value)}
        placeholder="Search here"
      ></input>
    );
  }
}

export default Search;
