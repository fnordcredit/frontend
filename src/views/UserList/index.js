// @flow
import React, { useContext, useState } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import UsersContext, { UserLoader } from "contexts/Users";
import useErrorHandler from "contexts/Error";
import TopBar from "./TopBar";
import SelectUser from "./SelectUser";
import API from "API";
import Main from "components/Main";
import BarcodeScanner from "components/BarcodeScanner";

import type { Sorting } from "./TopBar";
export type { Sorting } from "./TopBar";

type Props = {
  selectUser: (u: User) => void
};

const filterUser = (search: string) => (user: User) => (
  user.name.toLowerCase().indexOf(search.toLowerCase()) >= 0
);
const sortUser = (sorting: Sorting) => (a: User, b: User) => {
  switch (sorting) {
  case "last": return Math.sign(b.lastchanged - a.lastchanged);
  case "zyx": return b.name.localeCompare(a.name);
  default: return a.name.localeCompare(b.name);
  }
};

const addUser = (selectUser, handleError) => (user: string) => {
  API.addUser(user)
    .then((response) => {
      const users = response.data;
      const u = users.find((us) => (us.name === user ? us : null));
      if (u != null) {
        selectUser(u);
      } else {
        handleError("Something went wrong. We are not sure what :(");
      }
    }).catch(handleError);
};

const UserList = ({ sorting, search, selectUser }) => {
  const { users } = useContext(UsersContext);
  const barcodeSuccess = (s: string) => {
    if (s.startsWith("<u>")) {
      const result = users.find((u) => u.name === s.substring(3));
      if (result != null) {
        selectUser(result);
      }
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
      <BarcodeScanner onSuccess={barcodeSuccess} />
      {users.sort(sortUser(sorting)).filter(filterUser(search)).map((u) =>
        <SelectUser user={u} key={u.name} onClick={selectUser} />
      )}
    </div>
  );
};

const LoadIndicator = React.memo(() => (
  <CircularProgress color="secondary" size={96} style={{ margin: "32 auto" }} />
));

const UserListView = React.memo<Props>(({ selectUser }: Props) => {
  const [sorting, setSorting] = useState("last");
  const [search, setSearch] = useState("");
  const handleError = useErrorHandler();
  return (
    <React.Fragment>
      <TopBar sorted={sorting}
        changeSorting={setSorting}
        handleSearch={setSearch}
        addUser={addUser(selectUser, handleError)} />
      <Main>
        <UserLoader fallback={<LoadIndicator />}>
          <UserList sorting={sorting} search={search} selectUser={selectUser} />
        </UserLoader>
      </Main>
    </React.Fragment>
  );
});

export default UserListView;
