// @flow
import React, { type Node } from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
  }
}));

type Props = {
  icon: Node,
  text: string,
  onClick?: () => void
};

const Item = React.memo<Props>((props) => {
  const classes = useStyles();
  return (
    <MenuItem onClick={props.onClick} classes={classes}>
      <ListItemIcon>
        {props.icon}
      </ListItemIcon>
      <ListItemText primary={props.text} />
    </MenuItem>
  );
});

export default Item;
