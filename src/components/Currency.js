// @flow
import React from "react";
import Typography from "@material-ui/core/Typography";

export type Fmt = "diff" | "normal";

export const formatString = (amount: number, fmt: Fmt = "normal") => {
  const prefix = fmt === "diff" && amount > 0 ? "+" : "";
  return `${prefix}${amount.toFixed(2)}€`.replace(".", ",");
};

type FormatProps = {
  fmt?: Fmt,
  color?: "colorful" | "negOnly" | "none",
  inline?: boolean,
  extraProps?: Object,
  amount: number
};

const Currency = (props: FormatProps) => {
  const color = props.color || "none";
  const isNeg = props.amount < 0;
  const useColor = color === "colorful" || (isNeg && color === "negOnly");
  const colorStyle = props.amount < 0 ? "red" : "lightGreen";
  const extraProps = Object.assign({}, {
    style: Object.assign({},
      props.inline ? { display: "inline" } : {},
      useColor ? { color: colorStyle } : {}
    )
  }, props.extraProps);
  return (
    <Typography {...extraProps}>
      {formatString(props.amount, props.fmt || "normal")}
    </Typography>
  );
};

export default Currency;
