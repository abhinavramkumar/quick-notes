import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import {
  LoginPage,
  Header,
  Dashboard,
  NotePage,
  PageNotFound
} from "../components";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/note/:id" component={NotePage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
