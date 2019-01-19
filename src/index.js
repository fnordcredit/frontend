// @flow
import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import "../css/app.css";

// $FlowFixMe
const content: Element = document.getElementById("content");
ReactDOM.render(<App />, content);
