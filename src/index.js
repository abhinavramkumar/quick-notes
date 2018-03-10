import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {database, firebase} from './firebase/firebase';
import {
  Loader,
  Homepage,
  Header,
  Dashboard,
  NotePage,
  LoginPage,
  PageNotFound
} from './components';
import {start__getNotes} from './actions';
import configureStore from './store/store';
// Stylesheet
import './styles/index.css';

// Service Worker
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

render(
  <Loader/>, document.getElementById('root'));

const AppRouter = (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header/>
        <Switch>
          <Route path="/" component={Homepage} exact></Route>
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/note/:id" component={NotePage}></Route>
          <Route component={PageNotFound}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);

database
  .ref('notes')
  .once('value', (snapShot) => {
    const notes = [];
    snapShot.forEach(childSnapshot => {
      notes.push({
        ...childSnapshot.val(),
        id: childSnapshot.key
      });
    });
    store.dispatch(start__getNotes(notes));
    render(AppRouter, document.getElementById('root'));
  });

registerServiceWorker();

firebase
  .auth()
  .onAuthStateChanged(user => {
    if (user) {
      console.log("Log In");
    } else {
      console.log("Log Out");
    }
  });