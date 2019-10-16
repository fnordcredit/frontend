// @flow
import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter, Route, useHistory } from "react-router-dom";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import UserDetails from "views/UserDetails";
import UserList from "components/UserList";
import TopBar from "components/TopBar";
import UserSettings from "views/UserSettings";
import Main from "components/Main";
import ResetScroll from "components/ResetScroll";
import fnordCreditTheme from "colors";
import { ProductLoader } from "contexts/Products";
import { ErrorHandler } from "contexts/Error";
import { UserLoader } from "contexts/Users";
import { SnackbarManager } from "contexts/Snackbar";

/*
 * If you'd access any of the special links,
 * we require that / is pushed onto the history
 * because otherwise, the back button, which just goes back in history,
 * wouldn't work.
 */
const HistoryInitializer = React.memo(() => {
  const history = useHistory();
  useEffect(() => {
    history.push("/");
  }, []);
  return null;
});

const App = React.memo(() => {
  const [sorting, setSorting] = useState("last");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenu] = useState(false);
  const container = React.useRef(null);
  const closeMenu = useCallback(() => setMenu(false));
  const [vertMenuAnchorEl, setVertMenuAnchorEl] = useState(null);
  const handleVertMenuOpen = useCallback((event) => {
    setVertMenuAnchorEl(event.currentTarget);
  });
  const handleCloseVertMenu = useCallback(() => {
    setVertMenuAnchorEl(null);
  });
  const handleOpenMenu = useCallback(() => {
    setMenu(true);
  });
  return (
    <BrowserRouter>
      <HistoryInitializer />
      <ResetScroll />
      <TopBar sorted={sorting}
        changeSorting={setSorting}
        handleSearch={setSearch}
        actionButtonContainer={container}
        handleVertMenuOpen={handleVertMenuOpen}
        handleOpenMenu={handleOpenMenu}
      />
      <Main>
        <Route path="/settings/:userId">
          <UserSettings
            menuOpen={menuOpen}
            closeMenu={closeMenu}
            container={container} />
        </Route>
        <UserDetails
          search={search}
          vertMenuAnchorEl={vertMenuAnchorEl}
          handleCloseVertMenu={handleCloseVertMenu} />
        <UserList
          search={search} sorting={sorting}
          vertMenuAnchorEl={vertMenuAnchorEl}
          handleCloseVertMenu={handleCloseVertMenu} />
      </Main>
    </BrowserRouter>
  );
});

export default function StyledApp() {
  return (
    <ThemeProvider theme={fnordCreditTheme}>
      <CssBaseline />
      <ErrorHandler>
        <ProductLoader>
          <UserLoader>
            <SnackbarManager>
              <App />
            </SnackbarManager>
          </UserLoader>
        </ProductLoader>
      </ErrorHandler>
    </ThemeProvider>
  );
}
