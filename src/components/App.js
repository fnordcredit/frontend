// @flow
import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import UserDetails from "views/UserDetails";
import UserList from "components/UserList";
import TopBar from "views/UserList/TopBar";
import UserSettings from "views/UserSettings";
import Main from "components/Main";
import fnordCreditTheme from "colors";
import { ProductLoader } from "contexts/Products";
import { ErrorHandler } from "contexts/Error";
import { UserLoader } from "contexts/Users";

const App = React.memo(() => {
  const [sorting, setSorting] = useState("last");
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <TopBar sorted={sorting}
        changeSorting={setSorting}
        handleSearch={setSearch}
      />
      <Main>
        <Switch>
          <Route path="/settings/:userId">
            <UserSettings />
          </Route>
          <Route path="/user/:userId">
            <UserDetails />
          </Route>
          <Route path="/">
          </Route>
        </Switch>
        <UserList search={search} sorting={sorting} />
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
            <App />
          </UserLoader>
        </ProductLoader>
      </ErrorHandler>
    </ThemeProvider>
  );
}
