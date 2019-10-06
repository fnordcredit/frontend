// @flow
import React from "react";
import { Link } from "react-router-dom";
import LargeButton from "components/LargeButton";
import Currency from "components/Currency";

type Props = {
  user: User
};

const SelectUser = React.memo<Props>((props: Props) => {
  return (
    <LargeButton caption={props.user.name}
      image={props.user.avatar}
      extraProps={{ component: Link, to: `/user/${props.user.id}` }}>
      <Currency amount={props.user.credit}
        color="negOnly"
      />
    </LargeButton>
  );
});

export default SelectUser;
