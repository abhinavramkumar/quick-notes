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

const ComposedApp = (props) => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const renderedApp = () => render(<ComposedApp />, appRoot);

registerServiceWorker();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    database.ref(`${user.uid}/notes`).once("value", (snapShot) => {
      const notes = [];
      snapShot.forEach((childSnapshot) => {
        notes.push({
          ...childSnapshot.val(),
          id: childSnapshot.key
        });
      });
      store.dispatch(start__getNotes(notes));
      renderedApp();
    });
  } else {
    store.dispatch(logout());
    renderedApp();
  }
});
