import React, { Component } from "react";

import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

class ProtectedRoute extends Component {
  state = {};
  render() {
    const { component: Component, render, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(props) => {
          if (!auth.getCurrentUser())
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location },
                }}
              ></Redirect>
            );
          return Component ? <Component {...props}></Component> : render(props);
        }}
      ></Route>
    );
  }
}

export default ProtectedRoute;
