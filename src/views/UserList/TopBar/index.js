// @flow
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import SelectSorting from "./SelectSorting";
import AddUser from "./AddUser";

import type { Sorting } from "./SelectSorting";
export type { Sorting } from "./SelectSorting";

export type TopBarProps = {
  sorted: Sorting,
  changeSorting: (s: Sorting) => void,
  handleSearch: (e: Event) => void,
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

const TopBar = (props: TopBarProps) => (
  <Toolbar>
    <SelectSorting sorting={props.sorted}
      onChange={props.changeSorting} />
    <SearchBar handleSearch={props.handleSearch} />
    <AddUser addUser={props.addUser} />
  </Toolbar>
);

export default TopBar;
