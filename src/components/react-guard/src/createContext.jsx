import React, { Component } from "react";

import PropTypes from "prop-types";

function generateToken(length) {
  const symbolSet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";

  for (let i = 0; i < length; i++) {
    const position = Math.floor(Math.random() * symbolSet.length);
    token += symbolSet.charAt(position);
  }

  return token;
}

let reservedToken = {};
function uniqueToken(length) {
  let token;
  do {
    token = generateToken(length);
  } while (reservedToken[token]);
  reservedToken[token] = true;
  return token;
}

// This is just polyfill to emulate new context API using legacy API.
function createContext(defaultValue) {
  const TOKEN_LENGTH = 32;
  const token = uniqueToken(TOKEN_LENGTH);
  let contextTypes = {};
  contextTypes[token] = PropTypes.any;

  class Consumer extends Component {
    render() {
      const credentials = this.context[token];

      const { children } = this.props;

      if (!children) {
        return null;
      }

      if (Array.isArray(children) || typeof children !== "function") {
        throw new TypeError("Consumer expected exactly one function child");
      }

      return this.props.children(credentials);
    }
  }

  Consumer.contextTypes = contextTypes;

  class Provider extends Component {
    getChildContext() {
      let context = {};
      context[token] = this.props.value;
      return context;
    }

    render() {
      return this.props.children;
    }
  }

  Provider.childContextTypes = contextTypes;

  return { Provider, Consumer };
}

export default function(defaultValue) {
  // Try to use new context API, fallback to legacy API otherwise.
  const func = React.createContext || createContext;
  return func(defaultValue);
}
