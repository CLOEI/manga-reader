import {
  SET_DISCOVERY_DATA,
  SET_FAV_DATA,
  DEL_FAV_DATA,
  SET_DARK_MODE,
  DEL_FAV,
} from './constant';

export const setDiscoverState = (payload) => {
  return {
    type: SET_DISCOVERY_DATA,
    payload,
  };
};

export const setFavState = (payload) => {
  return {
    type: SET_FAV_DATA,
    payload,
  };
};

export const delFavData = (payload) => {
  return {
    type: DEL_FAV_DATA,
    payload,
  };
};

export const delFav = () => {
  return {
    type: DEL_FAV,
  };
};

export const setDarkMode = (payload) => {
  return {
    type: SET_DARK_MODE,
    payload,
  };
};
