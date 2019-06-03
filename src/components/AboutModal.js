// @flow
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

type Props = {
  open: boolean,
  onClose: () => void
};

const AboutModal = React.memo<Props>((props) => {
  return (
    <Dialog {...props}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"About fnordcredit"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <p>
              Fnordcredit is a trust-based accounting system developed for
              small communities and organizations that sell stuff.
          </p>
          <p>
            {"You can find out more about "}
            <a href="https://github.com/fnordcredit/fnordcredit">
                fnordcredit on github
            </a>.
          </p>
          <p>
            {"You are using "}
            <a href="https://github.com/fnordcredit/fnordcredit-frontend">
                the fnordcredit frontend
            </a>
            {" of"}
            <b>
              {` Version ${VERSION}.`}
            </b>
          </p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="secondary" autoFocus>
            Close
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default AboutModal;
