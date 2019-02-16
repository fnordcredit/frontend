// @flow
import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace";
import SettingsIcon from "@material-ui/icons/Settings";
import { useIdle } from "react-use";
import API from "API";
import AsidePanel from "./AsidePanel";
import ChangeCreditPanel from "./ChangeCreditPanel";
import * as Cur from "components/Currency";
import BarcodeScanner from "components/BarcodeScanner";
import TopBar from "components/TopBar";
import Main from "components/Main";
import ProductsContext from "contexts/Products";
import useErrorHandler from "contexts/Error";

type Props = {
  user: User,
  backToList: () => void,
  openSettings: (user: User) => void
};

const ChangeCreditPanels = React.memo(({ addCredit }) => {
  const products = useContext(ProductsContext);
  const categories = [...new Set(products.map((obj) => obj.category))];
  const scannerSuccess = (msg: string) => {
    const product = products.find((prod) => prod.ean.split("|").includes(msg));
    if (product != null) {
      addCredit(product)();
    }
  };
  const filterProducts = (cat) => products.filter((p) => p.category === cat);
  return (
    <Grid item xs={12} md={9}>
      <BarcodeScanner onSuccess={scannerSuccess} />
      <ChangeCreditPanel products={[0.5, 1, 2, 5, 10]}
        category="Add Credit" addCredit={addCredit} />
      { categories.map((cat) => (
        <ChangeCreditPanel
          products={filterProducts(cat)}
          category={cat} key={cat} addCredit={addCredit} />
      ))}
      <ChangeCreditPanel products={[-0.5, -1, -1.5, -2, -5]}
        category="Remove Credit" addCredit={addCredit} />
    </Grid>
  );
});

const UserDetails = (props: Props) => {
  const isIdle = useIdle(30e3);
  if (isIdle) {
    props.backToList();
  }
  const openSettings = () => props.openSettings(props.user);
  const [user, setUser] = useState(props.user);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const closeSnackbar = () => setSnackbarMsg("");
  const handleError = useErrorHandler();
  const addCredit = (ap: Product | number) => () => {
    if (typeof ap === "number") {
      const am: number = ap;
      API.addCredit(user, am)
        .then((response) => {
          setUser(response.data);
          setSnackbarMsg(am < 0
            ? `Successfully removed ${Cur.formatString(am)} from your Account`
            : `Successfully added ${Cur.formatString(am)} to your Account`);
        }).catch(handleError);
    } else {
      const p: Product = ap;
      API.buyProduct(user, p)
        .then((response) => {
          setUser(response.data);
          setSnackbarMsg(`Successfully bought ${p.name} `
            + `for ${Cur.formatString(p.price)}`);
        }).catch(handleError);
    }
  };
  return (
    <React.Fragment>
      <TopBar leftNode={
        <Button onClick={props.backToList}>
          <KeyboardBackspace /> Back
        </Button>
      } title={`User: ${props.user.name}`}
      fabIcon={<SettingsIcon />} fabAction={openSettings} />
      <Main>
        <Grid container justify="center">
          <Grid item xs={12} md={3} style={{ paddingRight: 10 }}>
            <AsidePanel user={user} transactions={"disabled"} />
          </Grid>
          <ChangeCreditPanels addCredit={addCredit} />
        </Grid>
      </Main>
      <Snackbar
        open={snackbarMsg !== ""}
        onClose={closeSnackbar}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{snackbarMsg}</span>}
      />
    </React.Fragment>
  );
};

export default UserDetails;
