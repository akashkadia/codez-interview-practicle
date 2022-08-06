import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import common from "./reducer";
const reducer = combineReducers({
  common,
});

const middleware = [thunk];
let composeEnhancers;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
  composeEnhancers = compose;
}
const store = createStore(
  reducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(...middleware))
);

export default store;
