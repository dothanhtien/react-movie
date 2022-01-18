import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

// reducers
import auth from "./reducers/auth";
import me from "./reducers/me";
import movie from "./reducers/movie";
import cinema from "./reducers/cinema";
import user from "./reducers/user";
import loading from "./reducers/loading";
import error from "./reducers/error";

const reducer = combineReducers({
  auth,
  me,
  movie,
  cinema,
  user,
  loading,
  error,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
