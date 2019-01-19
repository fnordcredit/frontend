// @flow
import React from "react";
import LargeButton from "components/LargeButton";

type Props = {
  user: User,
  onClick: (u: User) => void
};

export default class SelectUser extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <LargeButton variant="raised" color="primary"
        onClick={() => this.props.onClick(this.props.user)}>
        {this.props.user.name}
        <br/>
        {this.props.user.credit.toFixed(2)}€
      </LargeButton>
    );
  }
}

