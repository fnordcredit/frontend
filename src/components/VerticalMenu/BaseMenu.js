// @flow
import React, { type Node } from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
  paper: {
    border: "1px solid #000",
    backgroundColor: theme.palette.background.default
  }
}));

type Props = {
  anchorEl: Object,
  onClose: () => void,
  children: Node
};

const BaseMenu = React.memo<Props>((props) => {
  const anchorEl = props.anchorEl;
  const classes = useStyles();
  return (
    <Menu
      id="list-vert-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={props.onClose}
      classes={classes}
    >
      {props.children}
    </Menu>
  );
});

export default BaseMenu;
