// @flow
import React, { useState, useContext, type Node } from "react";
import ErrorDialog from "components/ErrorDialog";
import type { $AxiosError } from "axios";

export type ErrorType<T> = {
  error: ?($AxiosError<T> | string),
  callback: ?(() => void)
};
export type ContextType<T> = (p: ErrorType<T>) => void;
const Context: React$Context<ContextType<any>> =
  React.createContext(() => {});

export const ErrorHandler = ({ children }: { children: Node }) => {
  const [state, setState] = useState({ error: null, callback: null });
  const handleClose = () => {
    if (state.callback != null) {
      state.callback();
    }
    setState({ error: null, callback: null });
  };
  return (
    <Context.Provider value={setState}>
      <React.Fragment>
        <ErrorDialog onClose={handleClose}
          error={state.error}
          open={state.error != null}
        />
        {children}
      </React.Fragment>
    </Context.Provider>
  );
};

const useError = <T> (callback: $PropertyType<ErrorType<T>, "callback">) => {
  const setState = useContext(Context);
  return (error: $PropertyType<ErrorType<T>, "error">) => {
    setState({ error: error, callback: callback });
  };
};

export default useError;
