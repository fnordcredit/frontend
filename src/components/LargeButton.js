// @flow
import * as React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";

type Props = {
  caption: React.Node,
  children?: React.Node,
  image?: ?string,
  onClick: () => void,
  extraProps?: Object
};

const useStyles = makeStyles((theme) => ({
  root: {
    textTransform: "none",
    height: 140,
    width: 200,
    margin: theme.spacing.unit,
    display: "inline-block",
    overflow: "hidden",
    padding: 0
  },
  caption: {
    marginTop: theme.spacing.unit * 5.5,
    padding: theme.spacing.unit,
    overflowWrap: "break-word"
  }
}));

const LargeButton = React.memo<Props>((props: Props) => {
  const classes = useStyles();
  return (
    <Button classes={{ root: classes.root }} onClick={props.onClick}
      variant="contained" color="primary" {...props.extraProps || {}}>
      <Typography align="center" variant="h6" className={classes.caption}>
        {props.caption}
      </Typography>
      {props.children || null}
    </Button>
  );
});

export default LargeButton;
