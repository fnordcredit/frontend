// @flow
import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles({
  image: {
    borderRadius: 5,
    height: 88,
    marginTop: 2,
    marginBottom: -4
  }
});

export default ({ src }: { src: string }) => {
  const classes = useStyles();
  return <img src={src} className={classes.image} />;
};
