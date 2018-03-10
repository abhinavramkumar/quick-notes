import { firebase, googleAuthProvider } from "../firebase/firebase";

const start__Login = () => {
  return (dispatch) => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

const login = (uid = "") => ({
  type: "LOGIN",
  uid
});

const logout = () => ({
  type: "LOGOUT"
});

const start__Logout = () => {
  return (dispatch) => {
    return firebase.auth().signOut();
  };
};

export { start__Login, start__Logout, logout, login };
