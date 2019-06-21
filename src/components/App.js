// @flow
import React, { useState } from "react";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import UserDetails from "views/UserDetails";
import UserList from "views/UserList";
import UserSettings from "views/UserSettings";
import fnordCreditTheme from "colors";
import { ProductLoader } from "contexts/Products";
import { ErrorHandler } from "contexts/Error";
import { AuthHandler, useLogout, useAuth } from "contexts/Auth";

export type View = "list" | "details" | "settings"
const App = React.memo(() => {
  const [view, setView] = useState("list");
  const authenticate = useAuth();
  const logout = useLogout();
  const toUserList = () => {
    logout();
    setView({ type: "list" });
  };
  const toUserDetails = () => setView("details");
  const toUserSettings = () => setView("settings");
  const selectUser = (u: User) => {
    authenticate(u.id);
    toUserDetails();
  };
  switch (view) {
  case "details": return (
    <UserDetails backToList={toUserList}
      openSettings={toUserSettings} />
  );
  case "settings": return (
    <UserSettings onClose={toUserDetails} />
  );
  case "list":
  default: return (
    <UserList selectUser={selectUser} />
  );
  }
});

export default function StyledApp() {
  return (
    <ThemeProvider theme={fnordCreditTheme}>
      <CssBaseline />
      <ProductLoader>
        <ErrorHandler>
          <AuthHandler>
            <App />
          </AuthHandler>
        </ErrorHandler>
      </ProductLoader>
    </ThemeProvider>
  );
}
