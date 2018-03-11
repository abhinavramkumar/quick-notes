// @flow
/**
 * Quick Notes App with firebase auth and database integration
 * Multi Color support, WYSIWYG editor, multiple layout modes, Full page Editor if needed etc.
 *
 * @version 0.0.9
 * @author [codefusion] (https://github.com/lifeinvader00)
 */

import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { database, firebase } from "./firebase/firebase";
import {
  Loader,
  Homepage,
  Header,
  Dashboard,
  NotePage,
  LoginPage,
  PageNotFound
} from "./components";
import AppRouter from "./routers/AppRouter";
import { start__getNotes, login, logout } from "./actions";
import configureStore from "./store/store";
// Stylesheet
import "./styles/index.css";

// Service Worker
import registerServiceWorker from "./registerServiceWorker";

const store = configureStore();

const appRoot = document.getElementById("root");

render(<Loader />, appRoot);

/**
 * ComposedApp component
 *
 * @param {any} props
 */
const ComposedApp = (props) => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

/**
 * RenderedApp
 *
 * @return render(<ComposedApp />, appRoot)
 */
const RenderedApp = () => render(<ComposedApp />, appRoot);

registerServiceWorker();

firebase.auth().onAuthStateChanged((user) => {
  /** Check if user is logged in ie the auth state */
  if (user) {
    /** Dispatch login action to redux when user is logged in */
    store.dispatch(login(user.uid));

    /** Retrieve Data from firebase before rendering app */
    database.ref(`${user.uid}/notes`).once("value", (snapShot) => {
      const notes = [];
      snapShot.forEach((childSnapshot) => {
        notes.push({
          ...childSnapshot.val(),
          id: childSnapshot.key
        });
      });

      /** Dispatch retreived notes to redux */
      store.dispatch(start__getNotes(notes));

      /** Render App */
      RenderedApp();
    });
  } else {
    /** On Logout dispatch logout action to redux */
    store.dispatch(logout());

    /** Render App */
    RenderedApp();
  }
});
