// @flow
import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default class View<P, S> extends React.Component<P, S> {
  constructor(props: P) {
    super(props);
  }

  renderView(): ?React.Node {
    return null;
  }

  renderToolbar() {
    return (
      <Toolbar>
        <Typography variant="title" color="inherit">
          Fnordcredit
        </Typography>
      </Toolbar>
    );
  }

  render() {
    return [
      <AppBar position="fixed" key="appbarontop" style={{ height: 64 }}>
        {this.renderToolbar()}
      </AppBar>,
      <div key="contentcontainer" style={{ marginTop: 68 }}>
        {this.renderView()}
      </div>
    ];
  }
}
