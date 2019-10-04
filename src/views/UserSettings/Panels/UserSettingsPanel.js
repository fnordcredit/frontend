// @flow
import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextField from "@material-ui/core/TextField";
import ListSubheader from "@material-ui/core/ListSubheader";
import UserIcon from "@material-ui/icons/Person";
import makeStyles from "@material-ui/styles/makeStyles";
import Avatar from "components/Avatar";

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    width: "100%",
    height: "100%",
    padding: theme.spacing.unit
  },
  avatarActions: {
    marginTop: theme.spacing.unit * 2
  }
}));

export type Props = {
  user: User,
  handleNameChange: (name: string) => void,
  handleGravatarChange: (email: string) => void
};

type ChangeAvatarProps = {
  user: User,
  handleGravatarChange: (email: string) => void
};

const ChangeAvatar = React.memo<ChangeAvatarProps>((props) => {
  const user = props.user;
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const classes = useStyles();
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = () => {
    props.handleGravatarChange(email);
    setOpen(false);
  };
  return (
    <React.Fragment>
      { user.avatar == null || <Avatar src={user.avatar} /> }
      <div className={classes.avatarActions}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Change Grvatar
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title">
        <DialogTitle id="dialog-title">Update your Gravatar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <a href="https://gravatar.com" method="_blank">Gravatar</a>
            {" is a service that allows you to globally change your "}
            {"Avatars, if you use it everywhere, that is. For it to work, "}
            {"we need you to enter your Gravatar email address. The email "}
            {"adress won't be saved by us."}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary"
            disabled={email === ""}>
            Update Gravatar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
});

const UserSettingsPanel = React.memo<Props>((props) => {
  const classes = useStyles();
  const user = props.user;
  const handleEvNameChange = (e) => props.handleNameChange(e.target.value);
  return (
    <Paper className={classes.mainPaper}>
      <Typography variant="h4" align="center">
        User Settings
      </Typography>
      <ChangeAvatar user={user}
        handleGravatarChange={props.handleGravatarChange} />
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
      </List>
    </Paper>
  );
});

export default UserSettingsPanel;
