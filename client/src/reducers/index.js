// src/reducers/index.js
import { combineReducers } from 'redux';
import authReducer1 from './authReducer1';
import itemReducer from './itemReducer';

export default combineReducers({
  auth: authReducer1,
  items: itemReducer,
});
