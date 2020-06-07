// @flow
import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import withStyles from "@material-ui/styles/withStyles";

const FallbackProgressBar = withStyles({
  root: { marginTop: 64 }
})((props) => (
  <LinearProgress color="secondary" {...props} />
));

export default FallbackProgressBar;
