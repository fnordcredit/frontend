// @flow
import React, { useEffect, useState, type Node } from "react";
import API from "API";

export type UserContext = {
  users: Array<User>,
  refresh: () => void
};
const Context: React$Context<UserContext> = React.createContext(
  { users: [], refresh: () => {}}
);

export type UserLoaderProps = {
  children: Node,
  fallback: Node
};
export const UserLoader = ({ children, fallback }: UserLoaderProps) => {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const refresh = () => {
    API.getAllUsers()
      .then((response) => {
        setUsers(response.data);
        setLoaded(true);
      });
  };
  useEffect(refresh, []);
  return (
    <Context.Provider value={{ users, refresh }}>
      {loaded ? children : fallback}
    </Context.Provider>
  );
};

export default Context;
