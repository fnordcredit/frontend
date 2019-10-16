// @flow
import React, { useState, useEffect, useCallback } from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import { Redirect, useLocation, Link } from "react-router-dom";
import { useUsers } from "contexts/Users";
import BarcodeScanner from "components/BarcodeScanner";
import LargeButton from "components/LargeButton";
import Currency from "components/Currency";
import UserListVerticalMenu from "components/VerticalMenu/UserListVerticalMenu";

import type { Sorting } from "components/SelectSorting";

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

const UserLink = (userId) => ({
  component: Link,
  to: `/user/${userId}`
});

const SelectUser = React.memo(({ user }) => {
  return (
    <LargeButton caption={user.name}
      image={user.avatar}
      extraProps={UserLink(user.id)}>
      <Currency amount={user.credit}
        color="negOnly"
      />
    </LargeButton>
  );
});

const OrderedList = React.memo(({ users, sorting, search, n }) => (
  users.sort(sortUser(sorting)).filter(filterUser(search)).map((u, k) =>
    (k < n ? <SelectUser user={u} key={u.id} /> : null)
  )
));

const useStyles = makeStyles({
  centered: {
    textAlign: "center"
  },
  hidden: {
    display: "none"
  }
});

type Props = {
  sorting: Sorting,
  search: string,
  vertMenuAnchorEl: Object,
  handleCloseVertMenu: () => void
};

const UserList = React.memo<Props>((props) => {
  const { sorting, search, vertMenuAnchorEl, handleCloseVertMenu } = props;
  const users = useUsers();
  const classes = useStyles();
  const [selectedUser, setSelectedUser] = useState("");
  const [n, setN] = useState(0);
  const barcodeSuccess = useCallback((s: string) => {
    const result = users.find((u) => u.name.toLowerCase() === s.toLowerCase());
    if (result != null) {
      setSelectedUser(result.id);
    }
  });
  const isActive = useLocation().pathname === "/";
  const divClass = isActive ? classes.centered : classes.hidden;
  useEffect(() => {
    if (n !== users.length) {
      setTimeout(() => setN(Math.min(n + 1, users.length)), 1);
    }
  });
  return (
    <div className={divClass}>
      { isActive &&
        <UserListVerticalMenu
          anchorEl={vertMenuAnchorEl}
          onClose={handleCloseVertMenu} />
      }
      {selectedUser === "" || <Redirect to={`/user/${selectedUser}`} />}
      <BarcodeScanner onSuccess={barcodeSuccess} />
      <OrderedList users={users} sorting={sorting} search={search} n={n} />
    </div>
  );
});

export default UserList;
