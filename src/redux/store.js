import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import mainReducer from "./reducer/index";
// import logger from "redux-logger";

const initialState = {};

const middleWare = [thunk];

// const dev = process.env.PROD_ENV !== "dev";

let composeEnhancers = applyMiddleware(...middleWare);
// if (dev) {
composeEnhancers = composeWithDevTools(applyMiddleware(...middleWare));
// }

// const store = createStore(
//   mainReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(logger))
// );

const store = createStore(mainReducer, initialState, composeEnhancers);

export default store;
