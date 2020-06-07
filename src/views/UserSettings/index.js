// @flow
import React, { useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import useUser from "hooks/useUser";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import UserIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import LeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import PrivacyIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import Portal from "@material-ui/core/Portal";
import makeStyles from "@material-ui/styles/makeStyles";
import UserSettingsPanel from "./Panels/UserSettingsPanel";
import useSettingsState from "./useSettingsState";

const CoreNavigation = React.memo(() => (
  <List component="nav">
    <ListItem button selected={true}>
      <ListItemIcon>
        <UserIcon />
      </ListItemIcon>
      <ListItemText inset primary="User Settings" />
    </ListItem>
    <ListItem button disabled>
      <ListItemIcon>
        <EmailIcon />
      </ListItemIcon>
      <ListItemText inset primary="Email Settings" />
    </ListItem>
    <ListItem button disabled>
      <ListItemIcon>
        <PrivacyIcon />
      </ListItemIcon>
      <ListItemText inset primary="Privacy" />
    </ListItem>
  </List>
));

const MobileNavigation = React.memo(({menuOpen, handleCloseMenu}) => {
  const history = useHistory();
  const handleBackButtonClick = history.goBack;
  return (
    <Hidden smUp implementation="css">
      <Drawer variant="temporary" open={menuOpen}>
        <ListItem button onClick={handleCloseMenu} aria-label="Close Menu">
          <ListItemIcon>
            <LeftIcon />
          </ListItemIcon>
        </ListItem>
        <Divider />
        <CoreNavigation />
        <Divider />
        <ListItem button onClick={handleBackButtonClick}>
          <ListItemIcon>
            <CloseIcon />
          </ListItemIcon>
          <ListItemText inset primary="Quit Settings" />
        </ListItem>
      </Drawer>
    </Hidden>
  );
});

const useNavigationStyles = makeStyles({
  paper: {
    marginTop: 64,
    zIndex: 0,
    width: 212
  }
});

const DesktopNavigation = React.memo(() => {
  const classes = useNavigationStyles();
  return (
    <Hidden xsDown implementation="css">
      <Drawer variant="permanent" open classes={classes}>
        <CoreNavigation />
      </Drawer>
    </Hidden>
  );
});

const useStyles = makeStyles((theme) => ({
  disabled: {
    background: "#444444 !important"
  },
  mainContainer: {
    marginTop: 64 + theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing.unit * 2
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: 212 + theme.spacing.unit * 2
    }
  }
}));

type Props = {
  menuOpen: boolean,
  closeMenu: () => void,
  container: Object,
};

const UserSettings = React.memo<Props>(({ menuOpen, closeMenu, container }) => {
  const { userId } = useParams();
  const user = useUser(userId);
  const { handleSave, handleNameChange, handleGravatarChange, changed } =
    useSettingsState({
      name: user.name,
      changed: false
    });
  const handleSaveClick = useCallback(() => {
    handleSave(user);
  }, [handleSave, user]);
  const classes = useStyles();
  return (
    <React.Fragment>
      <MobileNavigation handleCloseMenu={closeMenu} menuOpen={menuOpen} />
      <DesktopNavigation />
      <Portal container={container.current}>
        <IconButton aria-label="Save changes"
          color="secondary" onClick={handleSaveClick}
          disabled={!changed}
        >
          <SaveIcon />
        </IconButton>
      </Portal>
      <main className={classes.mainContainer}>
        <UserSettingsPanel user={user}
          handleNameChange={handleNameChange}
          handleGravatarChange={handleGravatarChange} />
      </main>
    </React.Fragment>
  );
});

export default UserSettings;
