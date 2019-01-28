// @flow
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import currency from "formatCurrency";

type Props = {
  user: User,
  onClick: (u: User) => void
};

const styles = (theme) => ({
  card: {
    display: "inline-block",
    margin: theme.spacing.unit,
    width: 200,
    cursor: "pointer",
    "&:hover": {
      background: fade(theme.palette.common.white, 0.15)
    }
  },
  title: {
    marginTop: theme.spacing.unit * 5,
    padding: theme.spacing.unit,
    "&:last-child": {
      paddingBottom: theme.spacing.unit
    },
    overflowWrap: "break-word"
  },
  amount: {
    padding: theme.spacing.unit * 2
  }
});

const SelectUser = withStyles(styles)((props: Props & Classes) => (
  <Card onClick={() => props.onClick(props.user)}
    classes={{ root: props.classes.card }}>
    <CardContent className={props.classes.title}>
      <Typography align="center" variant="h6">
        {props.user.name}
      </Typography>
    </CardContent>
    {
      currency.format(props.user.credit, {
        color: "negOnly",
        extraProps: { align: "center", className: props.classes.amount }
      })
    }
  </Card>
));

export default SelectUser;
