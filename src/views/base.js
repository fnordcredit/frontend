// @flow
import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = {
  appBar: { height: 64 },
  container: { marginTop: 68 }
};
export default class View<P, S> extends React.PureComponent<P, S> {
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
      <AppBar position="fixed" key="appbarontop" style={styles.appBar}>
        {this.renderToolbar()}
      </AppBar>,
      <div key="contentcontainer" style={styles.container}>
        {this.renderView()}
      </div>
    ];
  }
}
