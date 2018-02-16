// @flow
import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();

// $FlowFixMe
const content: Element = document.getElementById("content");
ReactDOM.render(<App />, content);
