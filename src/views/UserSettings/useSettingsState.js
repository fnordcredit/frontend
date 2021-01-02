// @flow
import { useContext } from "react";
import { useSetState } from "react-use";
import useErrorHandler from "contexts/Error";
import UserContext from "contexts/Users";
import API from "API";

export type Settings = {
  name: string,
  avatar?: { gravatar: string },
  changed: boolean
};

const apiReqRename = async (initialState, state, user) => {
  if (initialState.name === state.name) {
    return user;
  }
  const { data } = await API.renameUser(user, state.name);
  return data.find((us) => (us.id === user.id ? us : null));
};

const apiReqChangeAvatar = async (_initialState, state, user) => {
  if (state.avatar == null) {
    return user;
  }
  const { data } = await API.changeGravatar(user, state.avatar.gravatar);
  return data;
};

const useSettingsState = (initialState: Settings) => {
  const [state, setState] = useSetState(initialState);
  const refreshUsers = useContext(UserContext).refresh;
  const handleError = useErrorHandler();
  const handleNameChange = (name: string) => {
    setState({ name: name, changed: true });
  };
  const handleGravatarChange = (email: string) => {
    setState({ avatar: { gravatar: email }, changed: true });
  };
  const handleSaveAsync = async (user: User) => {
    const u1 = await apiReqRename(initialState, state, user);
    if (u1 == null) {
      throw new Error("Something went wrong :(");
    }
    const u2 = await apiReqChangeAvatar(initialState, state, u1);
    if (u2 == null) {
      throw new Error("Someting went wrong :(");
    }
    return u2;
  };
  const handleSave = (user: User, setUser: (User) => void) => {
    handleSaveAsync(user).then((u) => {
      setUser(u);
      setState({ changed: false });
    }).catch(handleError);
  };
  return {
    handleNameChange: handleNameChange,
    handleGravatarChange: handleGravatarChange,
    handleSave: handleSave,
    changed: state.changed
  };
};

export default useSettingsState;
