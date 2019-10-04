// @flow
import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Currency from "components/Currency";
import Avatar from "components/Avatar";
import { DateTime } from "luxon";
import Paper from "@material-ui/core/Paper";
import API from "API";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import makeStyles from "@material-ui/styles/makeStyles";
import TransactionChart from "./TransactionChart";

type AsidePanelProps = {
  user: User
}

type Transactions = Array<Transaction> | "loading" | "disabled" | "empty";

const useTransactions = (user: User, limit: number = 5): Transactions => {
  const [transactions, setTransactions] = useState("loading");
  useEffect(() => {
    API.getTransactions(user)
      .then((response) => setTransactions(
        response.data.length > 0
          ? response.data.sort((a, b) => (a.time < b.time ? 1 : -1))
          : "empty"
      ))
      .catch((_response) => setTransactions("disabled"));
  }, [user]);
  return typeof transactions === "string"
    ? transactions : transactions.slice(0, limit);
};

const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingTop: 0,
    paddingBottom: theme.spacing(0.75)
  }
}));

const TransactionDetails = React.memo(({ transactions }) => {
  const classes = useStyles();
  if (transactions === "loading") {
    return (
      <ListItem>
        <ListItemText
          primary={"Loading..."} />
      </ListItem>
    );
  } else if (transactions === "disabled") {
    return (
      <ListItem>
        <ListItemText
          primary={"Transaction logging is disabled in your settings."} />
      </ListItem>
    );
  } else if (transactions === "empty") {
    return (
      <ListItem>
        <ListItemText primary={"No recent transactions."} />
      </ListItem>
    );
  } else {
    return transactions.map((transaction) => (
      <ListItem key={transaction.id} classes={{root: classes.listItem}}>
        <ListItemText
          primary={[
            <Currency amount={transaction.delta}
              fmt="diff"
              color="colorful"
              inline={true}
              key="amount"
            />,
            transaction.description && ` (${transaction.description})`
          ]}
          secondary={
            DateTime.fromMillis(transaction.time)
              .setLocale("de")
              .toLocaleString(DateTime.DATETIME_MED)
          }/>
      </ListItem>
    ));
  }
});

const TransactionsSidePanel = React.memo(({ user }) => {
  const transactions = useTransactions(user);
  const chart = typeof transactions === typeof "string" || (
    <Paper key="chart">
      <TransactionChart
        // $FlowFixMe
        transactions={transactions}
        currentCredit={user.credit} />
    </Paper>
  );
  return (
    <React.Fragment>
      <ExpansionPanel defaultExpanded key="transactions">
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography>Last Transactions</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
            <TransactionDetails transactions={transactions} />
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {chart}
    </React.Fragment>
  );
});

const AsidePanel = React.memo<AsidePanelProps>(({ user }: AsidePanelProps) => {
  return (
    <React.Fragment>
      <Paper style={{ marginBottom: 20 }} key="credit">
        <List>
          <ListItem>
            { user.avatar && <Avatar src={user.avatar} /> }
            <ListItemText
              primary={<Currency amount={user.credit}
                fmt="normal" color="negOnly" />}
              secondary="Current Credit" />
          </ListItem>
        </List>
      </Paper>
      <TransactionsSidePanel user={user} />
    </React.Fragment>
  );
});

export default AsidePanel;
