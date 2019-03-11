// @flow
import React from "react";
import { Line } from "react-chartjs-2";
import { DateTime } from "luxon";

export type Props = {
  transactions: Array<Transaction>,
  currentCredit: number
};

const moneyAmountOnDay = ({ day, currentCredit, transactions }) => {
  const filterTransactions = (t) => (
    // $FlowFixMe
    DateTime.fromMillis(t.time).startOf("day")
      > DateTime.local().minus({ days: day }).startOf("day")
  );
  const dayTransactions = [...transactions].filter(filterTransactions);
  if (dayTransactions.length === 0) {
    return currentCredit;
  } else {
    return dayTransactions[dayTransactions.length - 1].credit;
  }
};

const generateData = ({ currentCredit, transactions }) => {
  const data = [];
  let current = currentCredit;
  for (let i = 0; i < 30; i++) {
    const dayDat = moneyAmountOnDay({
      day: i, currentCredit: current, transactions: transactions
    });
    data.push(dayDat);
    current = dayDat;
  }
  return data.reverse();
};

const generateLabels = () => (
  [...Array(30).keys()].map((i) =>
    DateTime.local().minus({ days: 30 - i }).setLocale("de")
      .toLocaleString(DateTime.DATE_SHORT)
  )
);

const generateDataset = (props) => (
  {
    label: "Credit",
    data: generateData(props)
  }
);

const TransactionChart = React.memo<Props>((props) => {
  const data = {
    labels: generateLabels(),
    datasets: [
      generateDataset(props)
    ]
  };
  return <Line data={data} />;
});

export default TransactionChart;
