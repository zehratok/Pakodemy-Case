import { combineReducers } from "redux";
import shownMoviesReducer from './shownMoviesReducer';
import {createStore} from 'redux';

const store = createStore(combineReducers({
  shownMoviesReducer: shownMoviesReducer
}));

export default store;
