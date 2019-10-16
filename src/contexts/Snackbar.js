// @flow
import React, { useContext, useCallback, useState, type Node } from "react";
import Snackbar from "@material-ui/core/Snackbar";

export type SnackbarContext = {
  message: ?Node,
  setMessage: (msg: ?Node) => void
};
const Context: React$Context<SnackbarContext> = React.createContext(
  { message: null, setMessage: () => {}}
);

type Props = {
  children: Node
};

export const SnackbarManager = React.memo<Props>(({ children }) => {
  const [message, setMessage] = useState(null);
  const closeSnackbar = useCallback(() => {
    setMessage(null);
  });
  return (
    <Context.Provider value={{ setMessage, message }}>
      {children}
      <Snackbar
        open={message != null}
        onClose={closeSnackbar}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{message}</span>}
      />
    </Context.Provider>
  );
});

export const useSnackbar = () => {
  const { setMessage } = useContext(Context);
  return setMessage;
};

export default Context;
