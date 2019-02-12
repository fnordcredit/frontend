// @flow
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

type Props = {
  addUser: (user: string) => void,
  open: boolean,
  onClose: () => void
};

const AddUserDialog = React.memo<Props>((props: Props) => {
  const [username, setUsername] = useState("");
  // $FlowFixMe
  const handleTextChange = (event: Event) => setUsername(event.target.value);
  const handleSubmit = () => {
    props.onClose();
    props.addUser(username);
  };
  return (
    <Dialog onClose={props.onClose} open={props.open} key="dialog">
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <TextField label="Username" onChange={handleTextChange} autoFocus />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary"
          onClick={props.onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="secondary"
          onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default AddUserDialog;
