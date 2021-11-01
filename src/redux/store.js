import { createStore } from 'redux';
import reducer from './reducers';

const store = createStore(
  reducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  const { favourite, darkmode } = store.getState();
  localStorage.setItem('fav', JSON.stringify(favourite));
  localStorage.setItem('darkToggled', darkmode);
});

export default store;
