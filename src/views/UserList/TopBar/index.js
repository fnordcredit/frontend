// @flow
import React, { useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import AboutIcon from "@material-ui/icons/HelpOutline";
import AddIcon from "@material-ui/icons/Add";
import TopBar from "components/TopBar";
import AboutModal from "components/AboutModal";
import SelectSorting from "./SelectSorting";
import AddUserDialog from "../AddUserDialog";

import type { Sorting } from "./SelectSorting";
export type { Sorting } from "./SelectSorting";

export type TopBarProps = {
  sorted: Sorting,
  changeSorting: (s: Sorting) => void,
  handleSearch: (s: string) => void
};

const searchStyles = (theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 3,
    width: "auto",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
});

const SearchBar = withStyles(searchStyles)(({classes, handleSearch}) => (
  <div className={classes.search}>
    <div className={classes.searchIcon}>
      <SearchIcon />
    </div>
    <InputBase
      placeholder="Search…"
      onChange={handleSearch}
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput
      }}
    />
  </div>
));

const About = React.memo(() => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <React.Fragment>
      <IconButton aria-label="About fnordcredit"
        onClick={handleOpen} color="secondary">
        <AboutIcon />
      </IconButton>
      <AboutModal open={open} onClose={handleClose} />
    </React.Fragment>
  );
});

const UserListTopBar = React.memo<TopBarProps>((props: TopBarProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => setDialogOpen(false);
  const handleDialogOpen = () => setDialogOpen(true);
  const handleSearch = (e) => props.handleSearch(e.target.value);
  return (
    <React.Fragment>
      <TopBar
        leftNode={
          <SelectSorting sorting={props.sorted}
            onChange={props.changeSorting} />
        } rightNode={
          <React.Fragment>
            <SearchBar handleSearch={handleSearch} />
            <About />
          </React.Fragment>
        } fabIcon={<AddIcon />}
        fabAction={handleDialogOpen}
      />
      <AddUserDialog
        onClose={handleDialogClose}
        open={dialogOpen} />
    </React.Fragment>
  );
});

export default UserListTopBar;
