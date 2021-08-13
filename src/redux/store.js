import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import mainReducer from "./reducer";

const initialState = {};

const middleWare = [thunk];

const dev = true;

let composeEnhancers = applyMiddleware(...middleWare);
if (dev) {
  composeEnhancers = composeWithDevTools(applyMiddleware(...middleWare));
}

const store = createStore(mainReducer, initialState, composeEnhancers);

export default store;
