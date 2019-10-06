// @flow
import React, { useState } from "react";
import { Redirect } from "react-router";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import useErrorHandler from "contexts/Error";
import API from "API";

type Props = {
  open: boolean,
  onClose: () => void
};

const addUser = (handleError, user: string, forceRedirect) => {
  API.addUser(user)
    .then((response) => {
      const users = response.data;
      const u = users.find((us) => (us.name === user ? us : null));
      if (u != null) {
        forceRedirect(u.id);
      } else {
        handleError("Something went wrong. We are not sure what :(");
      }
    }).catch(handleError);
};

const AddUserDialog = React.memo<Props>((props: Props) => {
  const [username, setUsername] = useState("");
  const [redirect, forceRedirect] = useState("");
  const handleError = useErrorHandler();
  // $FlowFixMe
  const handleTextChange = (event: Event) => setUsername(event.target.value);
  const handleSubmit = () => {
    props.onClose();
    addUser(handleError, username, forceRedirect);
  };
  return (
    <React.Fragment>
      { redirect === "" || <Redirect to={`/user/${redirect}`} /> }
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
    </React.Fragment>
  );
});

export default AddUserDialog;
