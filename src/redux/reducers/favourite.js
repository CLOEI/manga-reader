import { SET_FAV_DATA, DEL_FAV_DATA, DEL_FAV } from '../constant';

const initialState = JSON.parse(localStorage.getItem('fav')) || {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FAV_DATA:
      return {
        ...state,
        mangas: { ...state.mangas, [action.payload.id]: action.payload },
      };
    case DEL_FAV_DATA:
      const { [action.payload]: _, ...rest } = { ...state.mangas };
      return {
        ...state,
        mangas: rest,
      };
    case DEL_FAV:
      return {
        ...state,
        mangas: {},
      };
    default:
      return state;
  }
};
