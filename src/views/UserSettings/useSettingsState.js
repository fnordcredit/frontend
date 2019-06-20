// @flow
import { useSetState } from "react-use";
import useErrorHandler from "contexts/Error";
import API from "API";

export type Settings = {
  name: string,
  changed: boolean
};

export type OnSave = () => void;

const apiReqRename = async (initialState, state, user) => {
  if (initialState.name === state.name) {
    return null;
  }
  const { data } = await API.renameUser(user, state.name);
  return data.find((us) => (us.id === user.id ? us : null));
};


const useSettingsState = (initialState: Settings, onSave: OnSave = ()=>{}) => {
  const [state, setState] = useSetState(initialState);
  const handleError = useErrorHandler();
  const handleNameChange = (name: string) => {
    setState({ name: name, changed: true });
  };
  const handleSave = (user: User) => {
    apiReqRename(initialState, state, user)
      .then((u) => {
        if (u != null) {
          // TODO: Set new u
        }
        onSave();
      }).catch(handleError);
  };
  return {
    handleNameChange: handleNameChange,
    handleSave: handleSave,
    changed: state.changed
  };
};

export default useSettingsState;
