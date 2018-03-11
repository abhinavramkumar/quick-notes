import { firebase, googleAuthProvider } from "../firebase/firebase";

/**
 * Login to firebase with GoogleAuthProvider using Pop-up to sign up
 *
 * @returns firebase.auth().signInWithPopup(googleAuthProvider)
 */
const start__Login = () => {
  return (dispatch) => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

/**
 * Login action generator
 *
 * @return action object
 * @param {string} [uid=""]
 */
const login = (uid = "") => ({
  type: "LOGIN",
  uid
});

/**
 * Logout Action Generator
 *
 * @return action object
 */
const logout = () => ({
  type: "LOGOUT"
});

/**
 * Logout from firebase
 *
 * @returns firebase.auth().signOut()
 */
const start__Logout = () => {
  return (dispatch) => {
    return firebase.auth().signOut();
  };
};

export { start__Login, start__Logout, logout, login };
