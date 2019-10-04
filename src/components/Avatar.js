// @flow
import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  image: {
    borderRadius: 5,
    height: 88,
    marginTop: 2,
    marginBottom: -4,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

export default ({ src }: { src: string }) => {
  const classes = useStyles();
  return <img src={src} className={classes.image} />;
};
