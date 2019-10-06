// @flow
import React, { useState } from "react";
import { Redirect } from "react-router";
import { useUsers} from "contexts/Users";
import TopBar from "./TopBar";
import SelectUser from "./SelectUser";
import Main from "components/Main";
import BarcodeScanner from "components/BarcodeScanner";

import type { Sorting } from "./TopBar";
export type { Sorting } from "./TopBar";

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

const UserList = React.memo(({ sorting, search }) => {
  const users = useUsers();
  const [selectedUser, setSelectedUser] = useState("");
  const barcodeSuccess = (s: string) => {
    const result = users.find((u) => u.name.toLowerCase() === s.toLowerCase());
    if (result != null) {
      setSelectedUser(result.id);
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
      {selectedUser === "" || <Redirect to={`/user/${selectedUser}`} />}
      <BarcodeScanner onSuccess={barcodeSuccess} />
      {users.sort(sortUser(sorting)).filter(filterUser(search)).map((u) =>
        <SelectUser user={u} key={u.name} />
      )}
    </div>
  );
});

const UserListView = React.memo<{}>(() => {
  const [sorting, setSorting] = useState("last");
  const [search, setSearch] = useState("");
  return (
    <React.Fragment>
      <TopBar sorted={sorting}
        changeSorting={setSorting}
        handleSearch={setSearch}
      />
      <Main>
        <UserList sorting={sorting} search={search} />
      </Main>
    </React.Fragment>
  );
});

export default UserListView;
