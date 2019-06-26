// @flow
import React from "react";
import LargeButton from "components/LargeButton";
import Currency from "components/Currency";

type Props = {
  user: User,
  onClick: (u: User) => void
};

const SelectUser = React.memo<Props>((props: Props) => {
  const handleClick = () => props.onClick(props.user);
  return (
    <LargeButton onClick={handleClick} caption={props.user.name}
      image={props.user.avatar}>
      <Currency amount={props.user.credit}
        color="negOnly"
      />
    </LargeButton>
  );
});

export default SelectUser;
