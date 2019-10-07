// @flow
import React, { useState, useContext, useMemo, useCallback } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace";
import { useIdle, useAudio } from "react-use";
// $FlowFixMe
import kaChing from "data/ka-ching.mp3";
import API from "API";
import AsidePanel from "./AsidePanel";
import ChangeCreditPanel from "./ChangeCreditPanel";
import * as Cur from "components/Currency";
import BarcodeScanner from "components/BarcodeScanner";
import TopBar from "components/TopBar";
import Main from "components/Main";
import ProductsContext from "contexts/Products";
import useErrorHandler from "contexts/Error";
import useUser from "hooks/useUser";
import makeStyles from "@material-ui/styles/makeStyles";

const ChangeCreditPanels = React.memo((props) => {
  const { addCredit, backToList, onBarcodeNotFound } = props;
  const products = useContext(ProductsContext);
  const categories = useMemo(() =>
    [...new Set(products.map((obj) => obj.category))]);
  const scannerSuccess = (msg: string) => {
    const product = products.find((prod) => prod.ean.split("|").includes(msg));
    if (product != null) {
      addCredit(product)();
    } else if (msg === "back") {
      backToList();
    } else {
      onBarcodeNotFound();
    }
  };
  const filterProducts = (cat) => products.filter((p) => p.category === cat);
  const renderedCategories = useMemo(() => (
    categories.map((cat) => (
      <ChangeCreditPanel // $FlowFixMe
        products={filterProducts(cat)}
        category={cat} key={cat} addCredit={addCredit} />
    ))
  ), [products]);
  return (
    <Grid item xs={12} md={9}>
      <BarcodeScanner onSuccess={scannerSuccess} />
      <ChangeCreditPanel products={[0.5, 1, 2, 5, 10]}
        category="Add Credit" addCredit={addCredit} condensed />
      { renderedCategories }
      <ChangeCreditPanel products={[-0.5, -1, -1.5, -2, -5]}
        category="Remove Credit" addCredit={addCredit} condensed />
    </Grid>
  );
});

const useStyles = makeStyles((theme) => ({
  aside: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingRight: 0
    },
    [theme.breakpoints.up("md")]: {
      paddingRight: theme.spacing(2)
    }
  }
}));

const UserDetails = React.memo<{}>(() => {
  const { userId } = useParams();
  const classes = useStyles();
  const isIdle = useIdle(30e3);
  const [redirectBack, setBackToList] = useState(false);
  const user = useUser(userId);
  const backToList = useCallback(() => setBackToList(true));
  const [snackbarMsg, setSnackbarMsg] = useState(null);
  const closeSnackbar = useCallback(() => setSnackbarMsg(null));
  const handleError = useErrorHandler();
  const [audio, _audioState, audioControls] = useAudio({ src: `/${kaChing}` });
  const kaching = () => {
    // reset back to 0 for when two transactions are too close after each other
    audioControls.seek(0);
    audioControls.play();
  };
  const handleBarcodeNotFound = useCallback(() => {
    setSnackbarMsg(
      <Typography color="error">
        Unknown barcode scanned. Please enter the transaction manually.
      </Typography>
    );
  });
  const addCredit = useCallback((ap: Product | number) => () => {
    if (typeof ap === "number") {
      const am: number = ap;
      API.addCredit(userId, am)
        .then((_response) => {
          //setUser(response.data);
          kaching();
          setSnackbarMsg(am < 0
            ? `Successfully removed ${Cur.formatString(am)} from your Account`
            : `Successfully added ${Cur.formatString(am)} to your Account`);
        }).catch(handleError);
    } else {
      const p: Product = ap;
      API.buyProduct(userId, p)
        .then((_response) => {
          //setUser(response.data);
          kaching();
          setSnackbarMsg(`Successfully bought ${p.name} `
            + `for ${Cur.formatString(p.price)}`);
        }).catch(handleError);
    }
  }, []);
  return (
    <React.Fragment>
      { (redirectBack || isIdle) && <Redirect to="/" /> }
      <TopBar leftNode={
        <Button component={Link} to="/">
          <KeyboardBackspace /> Back
        </Button>
      } title={`User: ${user.name}`}
      fabProps={{ component: Link, to: `/settings/${userId}` }}
      fabIcon={<SettingsIcon />} />
      <Main>
        <Grid container justify="center">
          <Grid item xs={12} md={3} className={classes.aside}>
            <AsidePanel user={user} />
          </Grid>
          <ChangeCreditPanels addCredit={addCredit}
            backToList={backToList}
            onBarcodeNotFound={handleBarcodeNotFound} />
        </Grid>
      </Main>
      {audio}
      <Snackbar
        open={snackbarMsg != null}
        onClose={closeSnackbar}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{snackbarMsg}</span>}
      />
    </React.Fragment>
  );
});

export default UserDetails;
