// @flow
import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Restore from "@material-ui/icons/Restore";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";

export type Sorting = "abc" | "zyx" | "last";

type Props = {
  onChange: (sorting: Sorting) => void,
  sorting: Sorting
};

export default class SelectSorting extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  handleChange = (event: Event, value: "last" | "abc" | "zyx") => {
    this.props.onChange(value);
  }

  render() {
    return (
      <Tabs value={this.props.sorting} onChange={this.handleChange}
        indicatorColor="secondary" textColor="secondary" style={{ flex: 1 }}>
        <Tab value="last" icon={<Restore />} label="most recent" />
        <Tab value="abc" icon={<KeyboardArrowDown />} label="abc" />
        <Tab value="zyx" icon={<KeyboardArrowUp />} label="zyx" />
      </Tabs>
    );
  }
}
