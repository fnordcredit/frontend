// @flow
import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import "typeface-roboto";
import "styles/link.css";

// $FlowFixMe
const content: Element = document.getElementById("content");
ReactDOM.render(<App />, content);
