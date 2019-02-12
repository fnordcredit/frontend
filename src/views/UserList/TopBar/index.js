// @flow
import React, { useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import TopBar from "components/TopBar";
import SelectSorting from "./SelectSorting";
import AddUserDialog from "../AddUserDialog";

import type { Sorting } from "./SelectSorting";
export type { Sorting } from "./SelectSorting";

export type TopBarProps = {
  sorted: Sorting,
  changeSorting: (s: Sorting) => void,
  handleSearch: (s: string) => void,
  addUser: (u: string) => void
};

const searchStyles = (theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 4,
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

const UserListTopBar = React.memo<TopBarProps>((props: TopBarProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => setDialogOpen(false);
  const handleDialogOpen = () => setDialogOpen(true);
  return (
    <React.Fragment>
      <TopBar
        leftNode={<SelectSorting sorting={props.sorted}
          onChange={props.changeSorting} />
        } rightNode={
          <SearchBar handleSearch={(e) => props.handleSearch(e.target.value)} />
        } fabIcon={<AddIcon />}
        fabAction={handleDialogOpen}
      />
      <AddUserDialog addUser={props.addUser}
        onClose={handleDialogClose}
        open={dialogOpen} />
    </React.Fragment>
  );
});

export default UserListTopBar;
