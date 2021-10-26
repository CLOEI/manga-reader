import { SET_DISCOVERY_DATA } from '../constant';

export default (state = null, action) => {
  switch (action.type) {
    case SET_DISCOVERY_DATA:
      return { ...state, mangas: action.payload };
    default:
      return state;
  }
};
