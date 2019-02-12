// @flow
import * as React from "react";
import Fab from "@material-ui/core/Fab";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import makeStyles from "@material-ui/styles/makeStyles";

export type Props = {
  fabIcon?: React.Node,
  fabAction?: () => void,
  title?: string,
  leftNode?: React.Node,
  rightNode?: React.Node,
  fabProps?: Object
};

const useStyles = makeStyles({
  appBar: {
    height: 64
  },
  flex: {
    flex: 1
  },
  fab: {
    top: 28,
    marginLeft: "2.5em"
  }
});

const TopBar = React.memo<Props>((props: Props) => {
  const extraFabProps = props.fabAction != null
    ? Object.assign({ onClick: props.fabAction }, props.fabProps || {})
    : props.fabProps || {};
  const classes = useStyles();
  return (
    <AppBar position="fixed" key="appbarontop" className={classes.appBar}>
      <Toolbar>
        {props.leftNode}
        { props.title != null ?
          <Typography className={classes.flex} variant="h6" align="center">
            {props.title}
          </Typography> : null }
        {props.rightNode}
        {props.fabIcon == null ? null :
          <Fab color="secondary"
            className={classes.fab}
            {...extraFabProps}>
            {props.fabIcon}
          </Fab>
        }
      </Toolbar>
    </AppBar>
  );
});

export default TopBar;
