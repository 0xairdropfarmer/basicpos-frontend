import React, { Component } from "react";

import createReactContext from "./createContext.jsx";
import Requirement from "./Requirement";

const { Provider, Consumer } = createReactContext();

class Guard extends Component {
  render() {
    const { requirement } = this.props;

    if (!(requirement instanceof Requirement)) {
      throw new TypeError("requirement is expected to be Requirement instance");
    }

    return (
      <Consumer>
        {credentials =>
          requirement.isSatisfied(credentials) ? this.props.children : null
        }
      </Consumer>
    );
  }
}

export { Guard, Provider };
