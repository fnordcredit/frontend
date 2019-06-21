// @flow
import React, { useState, useContext, useEffect, type Node } from "react";
import { useSetState } from "react-use";
import useError from "contexts/Error";
import type { $AxiosError } from "axios";
import API from "API";

export type AuthType = {
  user: ?User,
  userId: ?number,
  pin: ?string
};
const defaultAuth = { user: null, userId: null, pin: null };
export type ContextType = {
  auth: AuthType,
  unAuth: () => void,
  reqAuth: (userId: number) => void,
  unsafeSetAuth: (auth: AuthType) => void
};
const Context: React$Context<ContextType> = React.createContext({
  auth: defaultAuth,
  unAuth: () => {},
  reqAuth: () => {},
  unsafeSetAuth: (auth: AuthType) => {}
});

export const AuthHandler = ({ children }: { children: Node }) => {
  const [state, setState] = useSetState(defaultAuth);
  const handleError = useError(() => { setState({ pin: null }) });
  useEffect(() => {
    if (state.userId != null) {
      const id = state.userId;
      API.getUser({ id: id }, state.pin || "null")
      .then((response) => {
        setState({ user: response.data });
      })
      .catch((error) => {
        if (error.request.status === 401) {
          setState({ user: null });
        } else {
          console.log(`User Id: ${id}`);
          handleError(error);
        }
      });
    }
  }, [state.userId, state.pin]);
  const unAuth = () => {
    setState(defaultAuth);
  };
  const reqAuth = (userId: number) => {
    setState({ userId: userId });
  };
  const unsafeSetAuth = (auth: AuthType) => {
    setState(auth);
  };
  return (
    <Context.Provider value={{
      auth: state,
      reqAuth: reqAuth,
      unAuth: unAuth,
      unsafeSetAuth: unsafeSetAuth
    }}>
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => {
  const { reqAuth } = useContext(Context);
  return (userId: number) => reqAuth(userId);
}

export const useUser = () => {
  const { auth } = useContext(Context);
  return auth.user;
};

export const useLogout = () => {
  const { unAuth } = useContext(Context);
  return () => unAuth();
};

export const useUnsafeSetUser = () => (user: User) => {
  const { auth, unsafeSetAuth } = useContext(Context);
  unsafeSetAuth({ ...auth, user: user });
};

type Fllbck<P> = (p: P) => Node;
export const withUser = <P> (Element: Node, fallback: Fllbck<P> = () => null) =>
  React.memo<*>((props: P) => {
    const user = useUser();
    if (user == null) {
      return fallback(props);
    } else {
      return <Element {...props} user={user} />
    }
  });

export default useUser;
