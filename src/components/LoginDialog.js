// @flow
import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

type Props = {
  open: boolean,
  onClose: () => void
}

const LoginDialog = React.memo<Props>((props: Props) => {
  const handleClose = props.onClose;
  return (
    <Dialog aria-labelledby="login-dialog-title" {...props}>
      <DialogTitle id="login-dialog-title">Pin Required</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Your login pin is required to view this page. Please enter your pin.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Pin"
          type="password"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleClose} color="secondary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default LoginDialog;
