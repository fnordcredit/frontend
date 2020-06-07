// @flow
import React, { type Node, type Ref, useCallback } from "react";
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
  const handleBackButtonPress = history.goBack;
  return (
    <Button onClick={handleBackButtonPress}>
      <KeyboardBackspace /> Back
    </Button>
  );
});

const BurgerMenu = React.memo(({ onMenuOpened }) => {
  const view = useView();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const hasMenu = view !== "details" && !matches;
  if (view === "list") {
    return null;
  }
  const handleOpenMenu = onMenuOpened;
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

const VerticalMenu = React.memo(({ onVertMenuOpened }) => {
  const hasVerticalMenu = useView() !== "settings";
  if (!hasVerticalMenu) {
    return null;
  }
  return (
    <IconButton aria-label="Open extra menu" onClick={onVertMenuOpened}>
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
  onSortingChanged: (s: Sorting) => void,
  handleSearch: (s: string) => void,
  actionButtonContainer: Ref<Node>,
  onVertMenuOpened: (e: Event) => void,
  onMenuOpened: () => void
};

const TopBar = React.memo<TopBarProps>((props) => {
  const propsHandleSearch = props.handleSearch;
  const handleSearch = useCallback((e) =>
    // $FlowFixMe
    propsHandleSearch(e.target.value), [propsHandleSearch]);
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <BurgerMenu onMenuOpened={props.onMenuOpened} />
        <SortingTool sorting={props.sorted} onChange={props.onSortingChanged} />
        <SearchElement onChange={handleSearch} />
        <VerticalMenu onVertMenuOpened={props.onVertMenuOpened} />
        <div ref={props.actionButtonContainer} />
      </Toolbar>
    </AppBar>
  );
});

export default TopBar;
