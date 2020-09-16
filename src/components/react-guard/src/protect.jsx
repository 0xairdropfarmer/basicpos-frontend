import React, { Component } from "react";

import Requirement from "./Requirement";
import { Guard } from "./Guard";

function protect(requirement) {
  if (!(requirement instanceof Requirement)) {
    throw new TypeError("requirement is expected to be Requirement instance");
  }

  return function(ComponentToProtect) {
    const isComponent =
      ComponentToProtect &&
      ComponentToProtect.prototype &&
      ComponentToProtect.prototype instanceof Component;

    if (!isComponent) {
      throw new TypeError("expected a class derived from React.Component");
    }

    return class extends Component {
      render() {
        return (
          <Guard requirement={requirement}>
            {/* TODO how to pass props? */}
            <ComponentToProtect {...this.props}>
              {this.props.children}
            </ComponentToProtect>
          </Guard>
        );
      }
    };
  };
}

export default protect;
