// @flow
import React from "react";
import View from "views/base";

import Toolbar from "@material-ui/core/Toolbar";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import API from "API";
import Cur from "formatCurrency";
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
  dialogError?: ?$AxiosError<any>
};

export default class UserDetails extends View<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      successMsg: "",
      user: props.user,
      lastTransactions: [],
      dialogError: null
    };
    this.updateTransactions();
  }

  addCredit = (amount: number) => () => {
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
    API.buyProduct(this.state.user, product)
      .then((response) => {
        this.setState({
          successMsg: `Successfully bought ${product.name}`
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
    this.setState({ dialogError: error });
  }

  closeErrorMsg = () => {
    this.setState({ dialogError: null });
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
          <Icon>keyboard_backspace</Icon> Back
        </Button>
        <Typography style={{ flex: 1 }} variant="title" align="center">
          User: {this.state.user.name}
        </Typography>
        <Button variant="fab" color="secondary"
          style={{ top: 28, marginLeft: "2.5em", visibility: "hidden" }}>
          <Icon>settings</Icon>
        </Button>
      </Toolbar>
    );
  }
}
