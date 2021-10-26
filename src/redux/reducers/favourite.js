import { SET_FAV_DATA } from '../constant';

const initialState = JSON.parse(localStorage.getItem('favourites'));

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FAV_DATA:
      return { ...state, mangas: action.payload };
    default:
      return state;
  }
};
