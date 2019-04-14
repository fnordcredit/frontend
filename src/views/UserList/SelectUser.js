// @flow
import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import LargeButton from "components/LargeButton";
import Currency from "components/Currency";

type Props = {
  user: User,
  onClick: (u: User) => void
};

const useStyles = makeStyles((theme) => ({
  amount: {
    padding: theme.spacing.unit * 2
  }
}));

const SelectUser = React.memo<Props>((props: Props) => {
  const classes = useStyles();
  const handleClick = () => props.onClick(props.user);
  return (
    <LargeButton onClick={handleClick} caption={props.user.name}>
      <Currency amount={props.user.credit}
        color="negOnly"
        extraProps={{ align: "center", className: classes.amount }}
      />
    </LargeButton>
  );
});

export default SelectUser;
