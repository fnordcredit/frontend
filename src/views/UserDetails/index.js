// @flow
import React from "react";
import View from "views/base";

import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Dialog from "@material-ui/core/Dialog";
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace";
import SettingsIcon from "@material-ui/icons/Settings";
import withStyles from "@material-ui/core/styles/withStyles";
import API from "API";
import Cur from "formatCurrency";
import UserSettings from "views/UserSettings";
import AsidePanel from "./AsidePanel";
import ChangeCreditPanel from "./ChangeCreditPanel";
import BarcodeScanner from "components/BarcodeScanner";
import ErrorDialog from "components/ErrorDialog";
import type { $AxiosError } from "axios";

type Props = {
  user: User,
  backToList: () => void,
  products: Array<Product>
};

type State = {
  successMsg: string,
  user: User,
  lastTransactions: Array<Transaction> | "disabled",
  dialogError?: ?$AxiosError<any>,
  timeout: ?TimeoutID,
  settingsOpen: boolean
};

const styles = (theme) => ({
  dialogPaper: {
    background: theme.palette.background.default
  }
});

class UserDetails extends View<Props & Classes, State> {
  constructor(props: Props & Classes) {
    super(props);
    this.state = {
      successMsg: "",
      user: props.user,
      lastTransactions: [],
      dialogError: null,
      timeout: setTimeout(this.onTimeout, 60*1000),
      settingsOpen: false
    };
    this.updateTransactions();
  }

  onTimeout = () => {
    this.props.backToList();
  }

  resetTimeout = () => {
    this.stopTimeout();
    this.setState({ timeout: setTimeout(this.onTimeout, 60*1000) });
  }

  stopTimeout = () => {
    if (this.state.timeout != null) {
      clearTimeout(this.state.timeout);
      this.setState({ timeout: null });
    }
  }

  componentWillUnmount = () => {
    this.stopTimeout();
  }

  addCredit = (amount: number) => () => {
    this.resetTimeout();
    const msg = amount < 0
      ? `Successfully removed ${Cur.formatString(amount)} from your Account`
      : `Successfully added ${Cur.formatString(amount)} to your Account`;
    API.addCredit(this.state.user, amount)
      .then((response) => {
        this.setState({
          successMsg: msg,
          user: response.data
        });
        this.updateTransactions();
      })
      .catch((error) => this.showError(error));
  }

  buyProduct = (product: Product) => () => {
    this.resetTimeout();
    API.buyProduct(this.state.user, product)
      .then((response) => {
        this.setState({
          successMsg: `Successfully bought ${product.name} `
            + `for ${Cur.formatString(product.price)}`,
          user: response.data
        });
        this.updateTransactions();
      })
      .catch((error) => this.showError(error));
  }

  updateTransactions = () => {
    API.getTransactions(this.state.user)
      .then((response) => this.setState({
        lastTransactions: response.data.sort(
          (a, b) => (a.time < b.time ? 1 : -1)).slice(0, 5)
      }))
      .catch((_response) => this.setState({
        lastTransactions: "disabled"
      }));
  }

  closeSnackbar = () => {
    this.setState({ successMsg: "" });
  }

  scannerSuccess = (msg: string) => {
    const product =
      this.props.products.find((prod) => prod.ean.split("|").includes(msg));
    if (product != null) {
      this.buyProduct(product)();
    }
  }

  showError = (error: $AxiosError<any>) => {
    this.stopTimeout();
    this.setState({ dialogError: error });
  }

  closeErrorMsg = () => {
    this.setState({ dialogError: null });
    this.resetTimeout();
  }

  openSettings = () => {
    this.stopTimeout();
    this.setState({ settingsOpen: true });
  }

  closeSettings = () => {
    this.setState({ settingsOpen: false });
    this.resetTimeout();
  }

  renderView() {
    return (
      <div style={{ padding: 15 }}>
        <BarcodeScanner onSuccess={this.scannerSuccess} />
        <Grid container justify="center">
          <Grid item xs={12} md={3} style={{ paddingRight: 10 }}>
            <AsidePanel user={this.state.user}
              transactions={this.state.lastTransactions} />
          </Grid>
          <Grid item xs={12} md={9}>
            <ChangeCreditPanel products={[0.5, 1, 2, 5, 10]}
              category="Add Credit" addCredit={this.addCredit} />
            <ChangeCreditPanel products={this.props.products}
              category="Products" addCredit={this.buyProduct} />
            <ChangeCreditPanel products={[-0.5, -1, -1.5, -2, -5]}
              category="Remove Credit" addCredit={this.addCredit} />
          </Grid>
        </Grid>
        <Snackbar
          open={this.state.successMsg !== ""}
          onClose={this.closeSnackbar}
          SnackbarContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.successMsg}</span>}
        />
        <ErrorDialog onClose={this.closeErrorMsg}
          error={this.state.dialogError}
          open={this.state.dialogError != null} />
      </div>
    );
  }

  renderToolbar() {
    return (
      <Toolbar>
        <Button onClick={this.props.backToList}>
          <KeyboardBackspace /> Back
        </Button>
        <Typography style={{ flex: 1 }} variant="h6" align="center">
          User: {this.state.user.name}
        </Typography>
        <Fab color="secondary"
          style={{ top: 28, marginLeft: "2.5em" }}
          onClick={this.openSettings}>
          <SettingsIcon />
        </Fab>
        <Dialog fullScreen
          open={this.state.settingsOpen}
          onClose={this.closeSettings}
          classes={{ paper: this.props.classes.dialogPaper }}
        >
          <UserSettings onClose={this.closeSettings} user={this.state.user} />
        </Dialog>
      </Toolbar>
    );
  }
}

export default withStyles(styles)(UserDetails);
