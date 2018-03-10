import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { notesReducer, filtersReducer, authReducer } from "../reducers";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const store = createStore(
    combineReducers({
      filters: filtersReducer,
      notes: notesReducer,
      auth: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};

export default configureStore;
