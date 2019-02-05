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
    height: 140,
    cursor: "pointer",
    background: theme.palette.primary.main,
    "&:hover": {
      background: fade(theme.palette.primary.main, 0.65)
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

class SelectUser extends React.PureComponent<Props & Classes> {
  onClick = () => {
    const { onClick, user } = this.props;
    onClick(user);
  }

  render() {
    const { classes, user } = this.props;

    return <Card onClick={this.onClick} classes={{ root: classes.card }}>
      <CardContent className={classes.title}>
        <Typography align="center" variant="h6">
          {user.name}
        </Typography>
      </CardContent>
      {
        currency.format(user.credit, {
          color: "negOnly",
          extraProps: { align: "center", className: classes.amount }
        })
      }
    </Card>;
  }
}


export default withStyles(styles)(SelectUser);
