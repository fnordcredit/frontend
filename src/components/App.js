// @flow
import React, { useState } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import UserDetails from "views/UserDetails";
import UserList from "views/UserList";
import UserSettings from "views/UserSettings";
import fnordCreditTheme from "colors";
import { ProductLoader } from "contexts/Products";
import { ErrorHandler } from "contexts/Error";

export type View = { type: "list" }
  | { type: "details", user: User }
  | { type: "settings", user: User };

const App = React.memo(() => {
  const [view, setView] = useState({ type: "list" });
  const toUserList = () => setView({ type: "list" });
  const toUserDetails = (u: User) => setView({ type: "details", user: u });
  const toUserSettings = (u: User) => setView({ type: "settings", user: u });
  switch (view.type) {
  case "details": return (
    <UserDetails user={view.user} backToList={toUserList}
      openSettings={toUserSettings} />
  );
  case "settings": return (
    <UserSettings onClose={toUserDetails} user={view.user} />
  );
  case "list":
  default: return (
    <UserList selectUser={toUserDetails} />
  );
  }
});

export default function StyledApp() {
  return (
    <MuiThemeProvider theme={fnordCreditTheme}>
      <CssBaseline />
      <ProductLoader>
        <ErrorHandler>
          <App />
        </ErrorHandler>
      </ProductLoader>
    </MuiThemeProvider>
  );
}
