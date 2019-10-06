// @flow
import { useState, useEffect } from "react";
import { useUsers } from "contexts/Users";

const useUser = (userId: number) => {
  const users = useUsers();
  const findUser = () => (
    users.find(
      (us) => us.id.toString() === userId.toString()
    )
  );
  const [user, setUser] = useState(findUser() || {
    credit: 0,
    id: userId,
    lastchanged: 0,
    name: "Loading...",
    avatar: null
  });
  useEffect(() => {
    const u = findUser();
    if (u != null && u !== user) {
      setUser(u);
    }
  }, [users]);
  return user;
};

export default useUser;
