// @flow
import * as React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import Avatar from "components/Avatar";

type Props = {
  caption: React.Node,
  children?: React.Node,
  image?: ?string,
  onClick?: () => void,
  condensed?: boolean,
  extraProps?: Object
};

const useStyles = makeStyles((theme) => ({
  root: {
    textTransform: "none",
    height: 140,
    width: 200,
    margin: theme.spacing(1),
    display: "inline-block",
    overflow: "hidden",
    padding: 0
  },
  condensed: {
    textTransform: "none",
    height: 80,
    width: 120,
    margin: theme.spacing(1),
    display: "inline-block",
    overflow: "hidden",
    padding: 0
  },
  caption: {
    overflowWrap: "break-word"
  },
  captionNoImage: {
    marginTop: 18
  },
  captionNoImageCondensed: {
    marginTop: 9
  }
}));

const LargeButton = React.memo<Props>((props: Props) => {
  const classes = useStyles();
  const captionNoImage =
    props.condensed ? classes.captionNoImageCondensed : classes.captionNoImage;
  const captionClasses = props.image != null ? classes.caption
    : `${classes.caption} ${captionNoImage}`;
  return (
    <Button
      classes={{ root: props.condensed ? classes.condensed : classes.root }}
      onClick={props.onClick}
      variant="contained" color="primary" {...props.extraProps || {}}>
      { props.image != null &&
        <Avatar src={props.image} /> }
      <Typography align="center"
        variant={props.image != null ? "subtitle2" : "h6"}
        className={captionClasses}>
        {props.caption}
      </Typography>
      {props.children || null}
    </Button>
  );
});

export default LargeButton;
