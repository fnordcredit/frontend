// @flow
import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  main: {
    margin: `82px ${theme.spacing(1)}px ${theme.spacing(1)}px`
  }
}));

// Wrapper component for use in views
const Main = React.memo<Children>(({children}) => {
  const classes = useStyles();
  return (
    <main className={classes.main}>
      {children}
    </main>
  );
});

export default Main;
