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
  const props = useColor ? {
    style: {
      color: amount < 0 ? "red" : "lightGreen",
      display: options.inline ? "inline" : "inherit"
    }
  } : {};
  return (
    <Typography {...props} {...options.extraProps || {}}>
      {formatString(amount, options.fmt || "normal")}
    </Typography>
  );
};

export default {
  formatString, format
};
