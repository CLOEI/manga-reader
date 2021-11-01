import { SET_DARK_MODE } from '../constant';

const initialState = Boolean(localStorage.getItem('darkToggled')) || false;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DARK_MODE:
      return action.payload;
    default:
      return state;
  }
};
