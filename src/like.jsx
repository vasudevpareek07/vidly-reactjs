import React, { Component } from "react";

class Like extends Component {
  render() {
    if (this.props.isFavourite) {
      return (
        <i
          className="fa fa-heart-o"
          aria-hidden="true"
          onClick={this.props.onLike}
        ></i>
      );
    }

    return <i className="fa fa-heart" onClick={this.props.onLike}></i>;
  }
}

export default Like;
