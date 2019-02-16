// @flow
import * as React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import Currency from "components/Currency";
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

  getDescriptionString = (transaction: Transaction): string => (
    transaction.description === "" ? "" : ` (${transaction.description})`
  );

  renderTransaction = (transaction: Transaction): React.Node => {
    const description = this.getDescriptionString(transaction);
    return (
      <ListItem key={transaction.id}>
        <ListItemText
          primary={[
            <Currency amount={transaction.delta}
              fmt="diff"
              color="colorful"
              inline={true}
              key="amount"
            />,
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

  renderTransactions = (): React.Node => {
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
    return (
      <React.Fragment>
        {this.props.transactions.map(this.renderTransaction)}
      </React.Fragment>
    );
  }

  render() {
    return [
      <Paper style={{ marginBottom: 20 }} key="credit">
        <List>
          <ListItem>
            <ListItemText
              primary={<Currency amount={this.props.user.credit}
                fmt="normal" color="negOnly" />}
              secondary="Current Credit" />
          </ListItem>
        </List>
      </Paper>,
      <Paper key="transactions">
        <List>
          <ListSubheader>Last Transactions</ListSubheader>
          { this.renderTransactions() }
        </List>
      </Paper>
    ];
  }
}
