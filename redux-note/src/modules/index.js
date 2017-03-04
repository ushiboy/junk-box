/* @flow */
import { combineReducers } from 'redux';
import dashboard from './dashboard';
import note from './note';

export default combineReducers({
  dashboard,
  note
});
