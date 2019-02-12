// @flow
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import type { $AxiosError } from "axios";

export type Props = {
  open: boolean,
  onClose: () => void,
  error?: (?$AxiosError<any> | string)
};

export default class ErrorDialog extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          An Error Occured
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {
              this.props.error != null ?
                (this.props.error.response != null
                  && (this.props.error.response.data
                  || this.props.error.response.statusText))
                  || this.props.error.code
                  || "Unknown Error"
                : (typeof this.props.error === "string"
                  && this.props.error)
                  || "Unknown Error"
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="secondary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
