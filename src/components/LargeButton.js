// @flow
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

const largeButtonStyles = (_theme) => ({
  root: {
    textTransform: "none",
    height: 120,
    width: 160,
    display: "inline-block",
    margin: 10,
    cursor: "pointer"
  }
});

export default @withStyles(largeButtonStyles) class LargeButton
  extends Button {}
