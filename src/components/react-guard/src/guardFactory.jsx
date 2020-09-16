import React, { Component } from "react";

import Requirement from "./Requirement";
import { Guard } from "./Guard";

function guardFactory(requirement) {
  if (!(requirement instanceof Requirement)) {
    throw new TypeError("requirement is expected to be Requirement instance");
  }

  return class extends Component {
    render() {
      return <Guard requirement={requirement}>{this.props.children}</Guard>;
    }
  };
}

export default guardFactory;
