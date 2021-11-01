import { combineReducers } from 'redux';
import discovery from './discovery';
import favourite from './favourite';
import darkmode from './darkmode';

export default combineReducers({
  darkmode,
  favourite,
  discovery,
});
