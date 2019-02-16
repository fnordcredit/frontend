// @flow
import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import Currency from "components/Currency";

type Props = {
  user: User,
  onClick: (u: User) => void
};

const useStyles = makeStyles((theme) => ({
  button: {
    display: "inline-block",
    width: 200,
    height: 140,
    margin: theme.spacing.unit,
    textTransform: "none",
    overflow: "hidden",
    padding: 0
  },
  title: {
    marginTop: theme.spacing.unit * 5,
    padding: theme.spacing.unit,
    overflowWrap: "break-word"
  },
  amount: {
    padding: theme.spacing.unit * 2
  }
}));

const SelectUser = React.memo<Props>((props: Props) => {
  const classes = useStyles();
  const handleClick = () => props.onClick(props.user);
  return (
    <Button onClick={handleClick} className={classes.button}
      variant="contained" color="primary">
      <Typography align="center" variant="h6" className={classes.title}>
        {props.user.name}
      </Typography>
      <Currency amount={props.user.credit}
        color="negOnly"
        extraProps={{ align: "center", className: classes.amount }}
      />
    </Button>
  );
});

export default SelectUser;
