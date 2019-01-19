// @flow
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core/Dialog";
import type { $AxiosError } from "axios";

export type Props = {
  open: boolean,
  onClose: () => void,
  error?: ?$AxiosError<any>
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
                : "Unknown Error"
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
