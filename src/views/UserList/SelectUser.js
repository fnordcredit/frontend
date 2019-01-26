// @flow
import React from "react";
import currency from "formatCurrency";
import LargeButton from "components/LargeButton";

type Props = {
  user: User,
  onClick: (u: User) => void
};

const SelectUser = (props: Props) => (
  <LargeButton variant="raised" color="primary"
    onClick={() => props.onClick(props.user)}
    style={{ overflowWrap: "break-word" }}>
    {props.user.name}
    <br/>
    {currency.format(props.user.credit, { color: "negOnly" })}
  </LargeButton>
);

export default SelectUser;
