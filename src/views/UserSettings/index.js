// @flow
import React from "react";
import View from "views/base";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import UserIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";
import EmailIcon from "@material-ui/icons/Email";
import LeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import PrivacyIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Fab from "@material-ui/core/Fab";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import withStyles from "@material-ui/core/styles/withStyles";

export type Props = {
  onClose: () => void,
  user: User
}

export type State = {
  menuOpen: boolean
};

const styles = (_theme) => ({
  drawerPaper: {
    marginTop: 64,
    zIndex: 0
  },
  fabDisabled: {
    background: "#444444 !important"
  },
  fab: {
    top: 28,
    marginLeft: "2.5em"
  }
});

class UserSettings extends View<Props & Classes, State> {
  constructor(props: Props & Classes) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  openMenu = () => {
    this.setState({ menuOpen: true });
  }

  closeMenu = () => {
    this.setState({ menuOpen: false });
  }

  close = () => {
    this.props.onClose();
  }

  renderToolbar() {
    return (
      <Toolbar>
        <Hidden smUp implementation="css">
          <IconButton aria-label="Open Menu" onClick={this.openMenu}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden xsDown implementation="css">
          <IconButton aria-label="Close Settings" onClick={this.close}>
            <CloseIcon />
          </IconButton>
        </Hidden>
        <Typography style={{ flex: 1 }} variant="h6" align="center">
          Settings: {this.props.user.name}
        </Typography>
        <Fab color="secondary"
          classes={
            { root: this.props.classes.fab,
              disabled: this.props.classes.fabDisabled
            }
          }
          disabled
        >
          <SaveIcon />
        </Fab>
      </Toolbar>
    );
  }

  renderNav = () => (
    <List component="nav">
      <ListItem button>
        <ListItemIcon selected={true}>
          <UserIcon />
        </ListItemIcon>
        <ListItemText inset primary="User Settings" />
      </ListItem>
      <ListItem button>
        <ListItemIcon selected={true}>
          <EmailIcon />
        </ListItemIcon>
        <ListItemText inset primary="Email Settings" />
      </ListItem>
      <ListItem button>
        <ListItemIcon disabled>
          <PrivacyIcon />
        </ListItemIcon>
        <ListItemText inset primary="Privacy" />
      </ListItem>
    </List>
  )

  renderView() {
    return (
      <React.Fragment>
        <Hidden smUp implementation="css">
          <Drawer variant="temporary" open={this.state.menuOpen}>
            <ListItem button onClick={this.closeMenu} aria-label="Close Menu">
              <ListItemIcon>
                <LeftIcon />
              </ListItemIcon>
            </ListItem>
            <Divider />
            {this.renderNav()}
            <Divider />
            <ListItem button onClick={this.close}>
              <ListItemIcon>
                <CloseIcon />
              </ListItemIcon>
              <ListItemText inset primary="Quit Settings" />
            </ListItem>
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer variant="permanent" open
            classes={{ paper: this.props.classes.drawerPaper }}
          >
            {this.renderNav()}
          </Drawer>
        </Hidden>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UserSettings);
