// @flow
import Button from "material-ui/Button";
import withStyles from "material-ui/styles/withStyles";

const largeButtonStyles = theme => ({
  root: {
    textTransform: "none",
    height: 120,
    width: 160,
    display: "inline-block",
    margin: 10,
    cursor: "pointer"
  }
});

@withStyles(largeButtonStyles)
export default class LargeButton extends Button {};
