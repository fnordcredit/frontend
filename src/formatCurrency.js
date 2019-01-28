// @flow
import React from "react";
import Typography from "@material-ui/core/Typography";

const formatString = (amount: number, fmt: "diff" | "normal" = "normal") => {
  const prefix = fmt === "diff" && amount > 0 ? "+" : "";
  return `${prefix}${amount.toFixed(2)}€`.replace(".", ",");
};

type FormatOptions = {
  fmt?: "diff" | "normal",
  color?: "colorful" | "negOnly" | "none",
  inline?: boolean,
  extraProps?: Object
};

const format = (amount: number, options: FormatOptions) => {
  const color = options.color || "none";
  const useColor = color === "colorful" || (amount < 0 && color === "negOnly");
  const colorStyle = useColor ? (amount < 0 ? "red" : "lightGreen") : "inherit";
  const props = {
    style: Object.assign({},
      options.inline ? { display: "inline" } : {},
      useColor ? { color: colorStyle } : {}
    )
  };
  return (
    <Typography {...props} {...options.extraProps || {}}>
      {formatString(amount, options.fmt || "normal")}
    </Typography>
  );
};

export default {
  formatString, format
};
