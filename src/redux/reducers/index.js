import { combineReducers } from 'redux';
import discovery from './discovery';
import favourite from './favourite';

export default combineReducers({
  favourite,
  discovery,
});
