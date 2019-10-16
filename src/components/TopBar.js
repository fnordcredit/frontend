// @flow
import React, { type Node, type Ref } from "react";
import { useHistory, useLocation } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import VerticalIcon from "@material-ui/icons/MoreVert";
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import makeStyles from "@material-ui/styles/makeStyles";
import useTheme from "@material-ui/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SelectSorting from "components/SelectSorting";
import SearchBar from "components/SearchBar";

import type { Sorting } from "components/SelectSorting";

const useStyles = makeStyles({
  appBar: {
    height: 64
  },
  flex: {
    flex: 1
  },
  fab: {
    top: 28,
    marginLeft: "2.5em"
  }
});

const useView = () => {
  const location = useLocation().pathname;
  if (location.includes("settings")) {
    return "settings";
  } else if (location.includes("user")) {
    return "details";
  }
  return "list";
};

const BackButton = React.memo(() => {
  const history = useHistory();
  return (
    <Button onClick={history.goBack}>
      <KeyboardBackspace /> Back
    </Button>
  );
});

const BurgerMenu = React.memo(({ handleOpenMenu }) => {
  const view = useView();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const hasMenu = view !== "details" && !matches;
  if (view === "list") {
    return null;
  }
  if (hasMenu) {
    return (
      <IconButton aria-label="Open Menu" onClick={handleOpenMenu}>
        <MenuIcon />
      </IconButton>
    );
  } else {
    return (
      <BackButton />
    );
  }
});

const VerticalMenu = React.memo(({ handleVertMenuOpen }) => {
  const hasVerticalMenu = useView() !== "settings";
  if (!hasVerticalMenu) {
    return null;
  }
  return (
    <IconButton aria-label="Open extra menu" onClick={handleVertMenuOpen}>
      <VerticalIcon />
    </IconButton>
  );
});

const SortingTool = React.memo((props) => {
  const hasSorting = useView() === "list";
  const classes = useStyles();
  if (!hasSorting) {
    return <div className={classes.flex} />;
  }
  return (
    <SelectSorting {...props} />
  );
});

const SearchElement = React.memo((props) => {
  const hasSearch = useView() !== "settings";
  if (!hasSearch) {
    return null;
  }
  return (
    <SearchBar onChange={props.onChange} />
  );
});

export type TopBarProps = {
  sorted: Sorting,
  changeSorting: (s: Sorting) => void,
  handleSearch: (s: string) => void,
  actionButtonContainer: Ref<Node>,
  handleVertMenuOpen: (e: Event) => void,
  handleOpenMenu: () => void
};

const TopBar = React.memo<TopBarProps>((props) => {
  // $FlowFixMe
  const handleSearch = (e) => props.handleSearch(e.target.value);
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <BurgerMenu handleOpenMenu={props.handleOpenMenu} />
        <SortingTool sorting={props.sorted} onChange={props.changeSorting} />
        <SearchElement onChange={handleSearch} />
        <VerticalMenu handleVertMenuOpen={props.handleVertMenuOpen} />
        <div ref={props.actionButtonContainer} />
      </Toolbar>
    </AppBar>
  );
});

export default TopBar;
