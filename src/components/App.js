// @flow
import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter, Route, useHistory } from "react-router-dom";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import TopBar from "components/TopBar";
import Main from "components/Main";
import ResetScroll from "components/ResetScroll";
import FallbackProgressBar from "components/FallbackProgressBar";
import fnordCreditTheme from "colors";
import { ProductLoader } from "contexts/Products";
import { ErrorHandler } from "contexts/Error";
import { UserLoader } from "contexts/Users";
import { SnackbarManager } from "contexts/Snackbar";


const UserSettings = React.lazy(() => import("views/UserSettings"));
const UserDetails = React.lazy(() => import("views/UserDetails"));
const UserList = React.lazy(() => import("components/UserList"));

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
  }, [history]);
  return null;
});

const App = () => {
  const [sorting, handleSortingChanged] = useState("last");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenu] = useState(false);
  const container = React.useRef(null);
  const closeMenu = useCallback(() => setMenu(false), [setMenu]);
  const [vertMenuAnchorEl, setVertMenuAnchorEl] = useState(null);
  const handleVertMenuOpened = useCallback((event) => {
    setVertMenuAnchorEl(event.currentTarget);
  }, [setVertMenuAnchorEl]);
  const handleCloseVertMenu = useCallback(() => {
    setVertMenuAnchorEl(null);
  }, [setVertMenuAnchorEl]);
  const handleOpenMenu = useCallback(() => {
    setMenu(true);
  }, [setMenu]);
  return (
    <BrowserRouter>
      <HistoryInitializer />
      <ResetScroll />
      <TopBar sorted={sorting}
        onSortingChanged={handleSortingChanged}
        handleSearch={setSearch}
        actionButtonContainer={container}
        onVertMenuOpened={handleVertMenuOpened}
        onMenuOpened={handleOpenMenu}
      />
      <React.Suspense fallback={<FallbackProgressBar />}>
        <Main>
          <Route path="/settings/:userId">
            <UserSettings
              menuOpen={menuOpen}
              closeMenu={closeMenu}
              container={container} />
          </Route>
          <Route path="/user/:userId">
            <UserDetails
              search={search}
              vertMenuAnchorEl={vertMenuAnchorEl}
              handleCloseVertMenu={handleCloseVertMenu} />
          </Route>
          <UserList
            search={search} sorting={sorting}
            vertMenuAnchorEl={vertMenuAnchorEl}
            handleCloseVertMenu={handleCloseVertMenu} />
        </Main>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default function StyledApp() {
  return (
    <React.StrictMode>
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
    </React.StrictMode>
  );
}
