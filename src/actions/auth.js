// @flow
import { firebase, googleAuthProvider } from "../firebase/firebase";

type Action = { type: string, uid: string } | { type: string };

const login = (uid: string = ""): Action => ({
  type: "LOGIN",
  uid
});

const logout = (): Action => ({
  type: "LOGOUT"
});

const start__Login = () => {
  return (dispatch: Dispatch): Promise<any> => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

const start__Logout = () => {
  return (dispatch: Dispatch): Promise<any> => {
    return firebase.auth().signOut();
  };
};

export { start__Login, start__Logout, logout, login };
