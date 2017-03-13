/* @flow */
import { combineReducers } from 'redux';
import dashboard from './dashboard';
import note from './note';
import starred from './starred';

export default combineReducers({
  dashboard,
  note,
  starred
});
