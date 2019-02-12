// @flow
import React from "react";
import "./bootstrap";
import ReactDOM from "react-dom";
import App from "components/App";
import "typeface-roboto";

// $FlowFixMe
const content: Element = document.getElementById("content");
ReactDOM.render(<App />, content);
