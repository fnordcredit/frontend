// @flow
import React, { useState, useContext, useMemo, useCallback } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useIdle, useAudio } from "react-use";
// $FlowFixMe
import kaChing from "data/ka-ching.mp3";
import API from "API";
import AsidePanel from "./AsidePanel";
import ChangeCreditPanel from "./ChangeCreditPanel";
import * as Cur from "components/Currency";
import BarcodeScanner from "components/BarcodeScanner";
import VertMenu from "components/VerticalMenu/UserDetailsVerticalMenu";
import ProductsContext from "contexts/Products";
import useErrorHandler from "contexts/Error";
import { useSnackbar } from "contexts/Snackbar";
import useUser from "hooks/useUser";
import makeStyles from "@material-ui/styles/makeStyles";

const ChangeCreditPanels = React.memo((props) => {
  const { addCredit, search } = props;
  const products = useContext(ProductsContext);
  const setSnackbarMsg = useSnackbar();
  const [backToList, setBackToList] = useState(false);
  const categories = useMemo(() =>
    [...new Set(products.map((obj) => obj.category))], [products]);
  const scannerSuccess = useCallback((msg: string) => {
    const product = products.find((prod) => prod.ean.split("|").includes(msg));
    if (product != null) {
      addCredit(product)();
    } else if (msg === "back") {
      setBackToList(true);
      setTimeout(() => setBackToList(false), 100);
    } else {
      setSnackbarMsg(
        <Typography color="error">
          Unknown barcode scanned. Please enter the transaction manually.
        </Typography>
      );
    }
  }, [products, addCredit, setBackToList, setSnackbarMsg]);
  const filterProducts = useCallback((cat) => (
    products.filter((p) => p.category === cat)
  ), [products]);
  const searchProducts = useCallback((cat) => (
    filterProducts(cat).filter(
      (p) => p.name.toLowerCase().includes(search.toLowerCase())
    )
  ), [filterProducts, search]);
  const renderedCategories = useMemo(() => (
    categories.map((cat) => (
      <ChangeCreditPanel // $FlowFixMe
        products={searchProducts(cat)}
        category={cat} key={cat} addCredit={addCredit} />
    ))
  ), [addCredit, categories, searchProducts]);
  return (
    <Grid item xs={12} md={9}>
      { backToList && <Redirect to="/" /> }
      <BarcodeScanner onSuccess={scannerSuccess} />
      { search !== "" || <ChangeCreditPanel products={[0.5, 1, 2, 5, 10]}
        category="Add Credit" addCredit={addCredit} condensed /> }
      { renderedCategories }
      { search !== "" || <ChangeCreditPanel products={[-0.5, -1, -1.5, -2, -5]}
        category="Remove Credit" addCredit={addCredit} condensed /> }
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
  },
  hidden: {
    display: "none"
  }
}));

const LoadedUserDetails = React.memo(({ user }) => {
  const isIdle = useIdle(30e3);
  return (
    <React.Fragment>
      {isIdle && <Redirect to="/" /> }
      <AsidePanel user={user} />
    </React.Fragment>
  );
});

type Props = {
  vertMenuAnchorEl: Object,
  handleCloseVertMenu: () => void,
  search: string
};

const UserDetails = React.memo<Props>((props) => {
  const { vertMenuAnchorEl, handleCloseVertMenu, search } = props;
  const userDetailsMatch = useRouteMatch("/user/:userId");
  const setSnackbarMsg = useSnackbar();
  const classes = useStyles();
  const uid = userDetailsMatch?.params?.userId;
  const [user, setUser, userFullyLoaded] = useUser(uid);
  const [audio, _audioState, audioControls] = useAudio({ src: `/${kaChing}` });
  const kaching = useCallback(() => {
    // reset back to 0 for when two transactions are too close after each other
    audioControls.seek(0);
    audioControls.play();
  }, [audioControls]);
  const handleError = useErrorHandler();
  const addCredit = useCallback((ap: Product | number) => () => {
    if (uid == null) {
      handleError("Something went wrong. UserId is null.");
      return;
    }
    if (typeof ap === "number") {
      const am: number = ap;
      API.addCredit(user.id, am)
        .then((response) => {
          setUser(response.data);
          kaching();
          setSnackbarMsg(am < 0
            ? `Successfully removed ${Cur.formatString(am)} from your Account`
            : `Successfully added ${Cur.formatString(am)} to your Account`);
        }).catch(handleError);
    } else {
      const p: Product = ap;
      API.buyProduct(user.id, p)
        .then((response) => {
          setUser(response.data);
          kaching();
          setSnackbarMsg(`Successfully bought ${p.name} `
            + `for ${Cur.formatString(p.price)}`);
        }).catch(handleError);
    }
  }, [uid, user, kaching, handleError, setSnackbarMsg]);
  const gridClass = uid == null ? classes.hidden : "";
  return (
    <Grid container justify="center" className={gridClass}>
      <Grid item xs={12} md={3} className={classes.aside}>
        { uid == null ? null : <React.Fragment>
          <LoadedUserDetails user={user} />
          <VertMenu anchorEl={vertMenuAnchorEl}
            onClose={handleCloseVertMenu} uid={uid} />
        </React.Fragment>}
      </Grid>
      <ChangeCreditPanels addCredit={addCredit}
        search={uid == null ? "" : search} />
      {audio}
    </Grid>
  );
});

export default UserDetails;
