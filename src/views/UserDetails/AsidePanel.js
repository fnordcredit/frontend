// @flow
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import Cur from "formatCurrency";
import { DateTime } from "luxon";
import Paper from "@material-ui/core/Paper";

type Props = {
  user: User,
  transactions: Array<Transaction> | "disabled"
}

export default class AsidePanel extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  renderTransaction(transaction: Transaction) {
    const description = transaction.description == ""
          ? ""
          : ` (${transaction.description})`;
    return (
      <ListItem key={transaction.id}>
        <ListItemText
          primary={[
            Cur.format(transaction.delta, {
              fmt:"diff",
              color: "colorful",
              inline: true
            }),
            description
          ]}
          secondary={
            DateTime.fromMillis(transaction.time)
              .setLocale("de")
              .toLocaleString(DateTime.DATETIME_MED)
          }/>
      </ListItem>
    );
  }

  renderTransactions = () => {
    if (this.props.transactions === "disabled") {
      return (
        <ListItem>
          <ListItemText
            primary={"Transaction logging is disabled in your settings."} />
        </ListItem>);
    }
    if (this.props.transactions.length === 0) {
      return (
        <ListItem>
          <ListItemText primary={"No recent transactions."} />
        </ListItem>);
    }
    return this.props.transactions.map(this.renderTransaction);
  }

  render() {
    return [
      <Paper style={{ marginBottom: 20 }}>
        <List>
          <ListItem>
            <ListItemText
              primary={Cur.format(this.props.user.credit,
                { fmt: "normal", color: "negOnly"})}
              secondary="Current Credit" />
          </ListItem>
        </List>
      </Paper>,
      <Paper>
        <List>
          <ListSubheader>Last Transactions</ListSubheader>
          { this.renderTransactions() }
        </List>
      </Paper>
    ];
  }
}
