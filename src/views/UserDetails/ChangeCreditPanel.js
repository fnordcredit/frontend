// @flow
import React from "react";
import ExpandMore from "@material-ui/icons/ExpandMore";
import LargeButton from "components/LargeButton";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Currency from "components/Currency";
import makeStyles from "@material-ui/styles/makeStyles";

type Props<T> = {
  products: Array<T>,
  category: string,
  addCredit: (product: T) => () => void,
  condensed?: boolean
};

type Val = Product | number;

const useStyles = makeStyles({
  noFlex: {
    display: "block"
  }
});

const ChangeCreditPanel = React.memo<Props<Val>>((props: Props<Val>) => {
  const classes = useStyles();
  const renderButton = (product: Val) => {
    const amount = typeof product !== "number" ? -product.price : product;
    const key = typeof product !== "number" ? product.id : product;
    const extraText = typeof product !== "number" ? ` ${product.name}` : "";
    const image = typeof product !== "number" && product.imagePath !== ""
      ? product.imagePath : null;
    return (
      <LargeButton condensed={props.condensed}
        onClick={props.addCredit(product)} key={key}
        image={image}
        caption={extraText}
      >
        <Currency amount={amount} fmt="diff" color="colorful"
          extraProps={{ variant: image == null ? "h6" : "body1" }} />
      </LargeButton>
    );
  };

  if (props.products.length === 0) {
    return null;
  }

  return (
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <Typography>{props.category}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes={{ root: classes.noFlex }}>
        {props.products.map(renderButton)}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
});

export default ChangeCreditPanel;
