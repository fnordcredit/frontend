// @flow
import React, { useState, useContext, useEffect, type Node } from "react";
import { useSetState } from "react-use";
import useError from "contexts/Error";
import type { $AxiosError } from "axios";
import API from "API";

export type AuthType = {
  user: ?User,
  userId: ?string,
  pin: ?string
};
const defaultAuth = { user: null, userId: null, pin: null };
export type ContextType = {
  auth: AuthType,
  unAuth: () => void,
  reqAuth: (userId: string) => void
};
const Context: React$Context<ContextType> = React.createContext({
  auth: defaultAuth,
  unAuth: () => {},
  reqAuth: () => {}
});

export const AuthHandler = ({ children }: { children: Node }) => {
  const [state, setState] = useSetState(defaultAuth);
  const handleError = useError(() => { setState({ pin: null }) });
  useEffect(() => {
    if (state.userId != null) {
      const id = state.userId;
      API.getUser(id, state.pin || "")
      .then((response) => {
        setState({ user: response.data });
      })
      .catch((error) => {
        if (error.request.status === 401) {
          setState({ user: null });
        } else {
          handleError(error);
        }
      });
    }
  }, [state.userId, state.pin]);
  const unAuth = () => {
    setState(defaultAuth);
  };
  const reqAuth = (userId: string) => {
    setState({ userId: userId });
  };
  return (
    <Context.Provider value={{auth: state, reqAuth: reqAuth, unAuth: unAuth}}>
      {children}
    </Context.Provider>
  );
};

// export const useSetUserUnsafe for API.js

export const useAuth = (userId: string) => {
  const { auth, reqAuth } = useContext(Context);
  reqAuth(userId);
  return auth.user;
}

export const useUser = () => {
  const { auth } = useContext(Context);
  return auth.user;
};

export const useLogout = () => {
  const { unAuth } = useContext(Context);
  unAuth();
}

export default useUser;
