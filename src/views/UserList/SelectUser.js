// @flow
import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import LargeButton from "components/LargeButton";
import Currency from "components/Currency";

type Props = {
  user: User,
  onClick: (u: User) => void
};

const useStyles = makeStyles({
  amountNoImage: {
    marginTop: 20
  }
});

const SelectUser = React.memo<Props>((props: Props) => {
  const classes = useStyles();
  const handleClick = () => props.onClick(props.user);
  const avatar = null; // TODO: Change once avatars are implemented
  const currencyClasses = avatar != null ? {}
    : { classes: { root: classes.amountNoImage } };
  return (
    <LargeButton onClick={handleClick} caption={props.user.name}
      image={avatar}>
      <Currency amount={props.user.credit}
        color="negOnly"
        extraProps={Object.assign({}, currencyClasses, { align: "center" })}
      />
    </LargeButton>
  );
});

export default SelectUser;
