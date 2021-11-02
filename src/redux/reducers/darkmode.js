import { SET_DARK_MODE } from '../constant';

const initialState = localStorage.getItem('darkToggled') === 'true';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DARK_MODE:
      return action.payload;
    default:
      return state;
  }
};
