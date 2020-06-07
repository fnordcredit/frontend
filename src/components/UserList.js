// @flow
import React, { useState, useCallback } from "react";
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
  const extraProps = UserLink(user.id);
  return (
    <LargeButton caption={user.name}
      image={user.avatar}
      extraProps={extraProps}>
      <Currency amount={user.credit}
        color="negOnly"
      />
    </LargeButton>
  );
});

const OrderedList = React.memo(({ users, sorting, search }) => (
  users.filter(filterUser(search)).sort(sortUser(sorting)).map((u) =>
    (<SelectUser user={u} key={u.id} />)
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
  const barcodeSuccess = useCallback((s: string) => {
    const result = users.find((u) => u.name.toLowerCase() === s.toLowerCase());
    if (result != null) {
      setSelectedUser(result.id);
    }
  }, [users, setSelectedUser]);
  const isActive = useLocation().pathname === "/";
  const divClass = isActive ? classes.centered : classes.hidden;
  return (
    <div className={divClass}>
      { isActive &&
        <UserListVerticalMenu
          anchorEl={vertMenuAnchorEl}
          onClose={handleCloseVertMenu} />
      }
      {selectedUser === "" || <Redirect to={`/user/${selectedUser}`} />}
      <BarcodeScanner onSuccess={barcodeSuccess} />
      <OrderedList users={users} sorting={sorting}
        search={isActive ? search : ""} />
    </div>
  );
});

export default UserList;
