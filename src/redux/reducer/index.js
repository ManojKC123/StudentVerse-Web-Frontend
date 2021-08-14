import { combineReducers } from "redux";
import searchReducer from "./searchReducer";

const mainReducer = combineReducers({
  searchReducer,
});

export default mainReducer;
