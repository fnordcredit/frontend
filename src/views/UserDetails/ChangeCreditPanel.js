// @flow
import React from "react";
import Icon from "@material-ui/core/Icon";
import LargeButton from "components/LargeButton";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Cur from "formatCurrency";

type Props<T> = {
  products: Array<T>,
  category: string,
  addCredit: (product: T) => any
};

export default class ChangeCreditPanel<T:number|Product>
    extends React.Component<Props<T>> {

  constructor(props: Props<T>) {
    super(props);
  }

  renderButton(product: T) {
    const amount = typeof product !== "number" ? -product.price : product;
    const key = typeof product !== "number" ? product.id : product;
    const priceTag = Cur.format(amount, { fmt: "diff", color: "colorful" });
    const extraText = typeof product !== "number" ? ` ${product.name}` : "";
    return (
      <LargeButton variant="raised" color="primary"
        onClick={this.props.addCredit(product)} key={key}>
          {typeof product !== "number" && product.imagePath != ""
            ? <img src={product.imagePath}
                  style={{
                    width: 45,
                    float: "left",
                    marginTop: -5,
                    marginLeft: -10
                  }} /> : null}
          <div style={{ marginTop: 5 }}>
            {priceTag}
            {extraText}
          </div>
      </LargeButton>
    );
  }

  render() {
    return (
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
          <Typography>{this.props.category}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ display: "block" }}>
          {this.props.products.map(this.renderButton.bind(this))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}
