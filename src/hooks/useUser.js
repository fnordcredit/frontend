// @flow
import { useState, useEffect } from "react";
import { useUsers } from "contexts/Users";
import API from "API";

const useUser = (userId: ?number, pincode?: string) => {
  const users = useUsers();
  const findUser = () => (
    users.find(
      (us) => us.id.toString() === userId?.toString()
    )
  );
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const [user, setUser]: [User, ((User => User) | User) => void] = useState(findUser() || {
    credit: 0,
    id: userId || -1,
    lastchanged: 0,
    name: "Loading...",
    avatar: null
  });
  useEffect(() => {
    if (userId != null) {
      API.getUser(userId, pincode).then(response => {
        setUser(response.data);
        setFullyLoaded(true);
      });
    }
  }, [userId]);
  return [user, setUser, fullyLoaded];
};

export default useUser;
