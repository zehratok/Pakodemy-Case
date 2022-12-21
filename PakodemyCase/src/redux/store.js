import { combineReducers } from "redux";
import movieIdReducer from "./movieIdReducer";
import shownMoviesReducer from "./shownMoviesReducer";
import { createStore } from "redux";

const store = createStore(combineReducers({
  shownMoviesReducer: shownMoviesReducer,
  movieIdReducer: movieIdReducer,
}));

export default store;
