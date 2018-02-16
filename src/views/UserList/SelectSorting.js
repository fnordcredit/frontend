// @flow
import React from "react";
import Tabs, { Tab } from "material-ui/Tabs";
import Icon from "material-ui/Icon";

export type Sorting = "abc"|"zyx"|"last";

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
        indicatorColor="secondary" textColor="secondary">
        <Tab value="last" icon={<Icon>restore</Icon>} />
        <Tab value="abc" icon={<Icon>vertical_align_bottom</Icon>} />
        <Tab value="zyx" icon={<Icon>vertical_align_top</Icon>} />
      </Tabs>
    );
  }
}
