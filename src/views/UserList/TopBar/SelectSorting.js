// @flow
import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Restore from "@material-ui/icons/Restore";
import ArrowDown from "@material-ui/icons/KeyboardArrowDown";
import ArrowUp from "@material-ui/icons/KeyboardArrowUp";
import { withStyles } from "@material-ui/core/styles";

export type Sorting = "abc" | "zyx" | "last";

type Props = {
  onChange: (sorting: Sorting) => void,
  sorting: Sorting
};

const handleChange = (onChange: $PropertyType<Props, "onChange">) =>
  (_e: Event, value: Sorting) => (
    onChange(value)
  );

const styles = (_theme) => ({
  labelIcon: {
    minHeight: 64,
    maxHeight: 64,
    paddingTop: 3
  }
});

const SelectSorting = withStyles(styles)(
  ({ classes, onChange, sorting }: Props & Classes) => (
    <Tabs value={sorting} onChange={handleChange(onChange)}
      indicatorColor="secondary" textColor="secondary" style={{ flex: 1 }}>
      <Tab value="last" icon={<Restore />} label="most recent"
        classes={classes} />
      <Tab value="abc" icon={<ArrowDown />} label="abc" classes={classes} />
      <Tab value="zyx" icon={<ArrowUp />} label="zyx" classes={classes} />
    </Tabs>
  )
);

export default SelectSorting;
