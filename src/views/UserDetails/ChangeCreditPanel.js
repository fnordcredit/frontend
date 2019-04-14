// @flow
import React from "react";
import ExpandMore from "@material-ui/icons/ExpandMore";
import LargeButton from "components/LargeButton";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Currency from "components/Currency";

type Props<T> = {
  products: Array<T>,
  category: string,
  addCredit: (product: T) => () => void
};

type Val = Product | number;

const ChangeCreditPanel = React.memo<Props<Val>>((props: Props<Val>) => {
  const renderButton = (product: Val) => {
    const amount = typeof product !== "number" ? -product.price : product;
    const key = typeof product !== "number" ? product.id : product;
    const extraText = typeof product !== "number" ? ` ${product.name}` : "";
    return (
      <LargeButton
        onClick={props.addCredit(product)} key={key}
        image={typeof product !== "number" && product.imagePath !== ""
          ? product.imagePath : null}
        caption={
          <div style={{ marginTop: 5 }}>
            <Currency amount={amount} fmt="diff" color="colorful" />
            {extraText}
          </div>
        } />
    );
  };

  return (
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <Typography>{props.category}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {props.products.map(renderButton)}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
});

export default ChangeCreditPanel;
