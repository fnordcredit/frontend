// @flow
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import UserDetails from "views/UserDetails";
import UserList from "views/UserList";
import UserSettings from "views/UserSettings";
import fnordCreditTheme from "colors";
import { ProductLoader } from "contexts/Products";
import { ErrorHandler } from "contexts/Error";
import { UserLoader } from "contexts/Users";

const App = React.memo(() => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/settings/:userId">
          <UserSettings />
        </Route>
        <Route path="/user/:userId">
          <UserDetails />
        </Route>
        <Route path="/">
          <UserList />
        </Route>
      </Switch>
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
