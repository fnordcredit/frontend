// @flow
import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextField from "@material-ui/core/TextField";
import ListSubheader from "@material-ui/core/ListSubheader";
import UserIcon from "@material-ui/icons/Person";
import Lock from "@material-ui/icons/Lock";
import LockOpen from "@material-ui/icons/LockOpen";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    width: "100%",
    height: "100%",
    padding: theme.spacing.unit
  }
}));

export type Props = {
  user: User,
  handleNameChange: (name: string) => void
}

const UserSettingsPanel = React.memo<Props>(({user, handleNameChange}) => {
  const classes = useStyles();
  const handleEvNameChange = (event) => handleNameChange(event.target.value);
  const pinProtection = false;
  return (
    <Paper className={classes.mainPaper}>
      <Typography variant="h4" align="center">
        User Settings
      </Typography>
      <List subheader={<ListSubheader>General Settings</ListSubheader>}>
        <ListItem>
          <ListItemIcon>
            <UserIcon />
          </ListItemIcon>
          <ListItemText primary="Name" />
          <ListItemSecondaryAction>
            <TextField
              defaultValue={user.name}
              onChange={handleEvNameChange}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            { pinProtection ? <Lock /> : <LockOpen /> }
          </ListItemIcon>
          <ListItemText
            primary={`${pinProtection ? "P" : "Not p"}rotected by user pin`} />
          <ListItemSecondaryAction>
            <Button color="secondary">
              Change
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Paper>
  );
});

export default UserSettingsPanel;
