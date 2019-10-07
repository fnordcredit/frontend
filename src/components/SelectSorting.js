// @flow
import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Restore from "@material-ui/icons/Restore";
import ArrowDown from "@material-ui/icons/KeyboardArrowDown";
import ArrowUp from "@material-ui/icons/KeyboardArrowUp";
import makeStyles from "@material-ui/styles/makeStyles";

export type Sorting = "abc" | "zyx" | "last";

type Props = {
  onChange: (sorting: Sorting) => void,
  sorting: Sorting
};

const useStyles = makeStyles((theme) => ({
  labelIcon: {
    minHeight: 64,
    maxHeight: 64,
    paddingTop: theme.spacing(1)
  }
}));

const SelectSorting = React.memo<Props>(({ onChange, sorting }) => {
  const classes = useStyles();
  const handleChange = (_e: Event, value: Sorting) => onChange(value);
  return (
    <Tabs value={sorting} onChange={handleChange}
      indicatorColor="secondary" textColor="secondary" style={{ flex: 1 }}>
      <Tab value="last" icon={<Restore />} label="most recent"
        classes={classes} />
      <Tab value="abc" icon={<ArrowDown />} label="abc" classes={classes} />
      <Tab value="zyx" icon={<ArrowUp />} label="zyx" classes={classes} />
    </Tabs>
  );
});

export default SelectSorting;
