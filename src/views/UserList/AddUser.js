// @flow
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";

type State = {
  open: boolean,
  username: string
};
type Props = {
  addUser: (user: string) => void
};

export default class AddUser extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
      username: ""
    };
  }

  addUser = () => {
    this.props.addUser(this.state.username);
    this.setState({ open: false });
  }

  changeUsername = (event: Event) => {
    // $FlowFixMe
    this.setState({ username: event.target.value });
  }

  openDialog = () => {
    this.setState({ open: true });
  }

  closeDialog = () => {
    this.setState({ open: false });
  }

  renderDialog() {
    return (
      <Dialog onClose={this.closeDialog}
        open={this.state.open} key="dialog"
      >
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField label="Username" onChange={this.changeUsername} />
        </DialogContent>
        <DialogActions>
          <Button variant="raised" color="primary"
            onClick={this.closeDialog}>
            Cancel
          </Button>
          <Button variant="raised" color="secondary"
            onClick={this.addUser}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  render() {
    return [
      <Button variant="fab" color="secondary" onClick={this.openDialog}
        style={{ top: 28 }} key="fab">
        <Icon>add</Icon>
      </Button>,
      this.renderDialog()
    ];
  }
}
