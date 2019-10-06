// @flow
import React, { useEffect, useState, useContext, type Node } from "react";
import API from "API";

export type UserContext = {
  users: Array<User>,
  refresh: () => void
};
const Context: React$Context<UserContext> = React.createContext(
  { users: [], refresh: () => {}}
);

export type UserLoaderProps = {
  children: Node
};

export const UserLoader = ({ children }: UserLoaderProps) => {
  const [users, setUsers] = useState([]);
  const refresh = () => {
    API.getAllUsers()
      .then((response) => {
        setUsers(response.data);
      });
  };
  useEffect(refresh, []);
  return (
    <Context.Provider value={{ users, refresh }}>
      {children}
    </Context.Provider>
  );
};

export const useUsers = () => {
  const { users } = useContext(Context);
  return users;
};

export default Context;
