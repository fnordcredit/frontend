// @flow
import { useState, useEffect } from "react";
import { useUsers } from "contexts/Users";
import useErrorHandler from "contexts/Error";
import API from "API";

type SetUser = ((User => User) | User) => void;
type UseUser = [User, SetUser, boolean, boolean];
const useUser = (userId: ?number, pincode?: ?string): UseUser => {
  const users = useUsers();
  const handleError = useErrorHandler();
  const findUser = () => (
    users.find(
      (us) => us.id.toString() === userId?.toString()
    )
  );
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const [user, setUser]: [User, SetUser] = useState(findUser() || {
    credit: 0,
    id: userId || -1,
    lastchanged: 0,
    name: "Loading...",
    avatar: null
  });
  // isPinRequired is missing in `User` but returned by /users/all
  // $FlowFixMe
  const [loginRequired, setLoginRequired] = useState(user?.isPinRequired || false);
  useEffect(() => {
    if (userId != null) {
      API.getUser(userId, pincode).then(response => {
        setUser(response.data);
        setFullyLoaded(true);
        setLoginRequired(false);
      }).catch(error => {
        if (error?.response?.status == 401) {
          setLoginRequired(true);
        } else {
          handleError(error);
        }
      });
    }
  }, [userId]);
  return [user, setUser, fullyLoaded, loginRequired];
};

export default useUser;
