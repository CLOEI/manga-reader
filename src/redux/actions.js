import { SET_DISCOVERY_DATA } from './constant';

export const setDiscoverState = (payload) => {
  return {
    type: SET_DISCOVERY_DATA,
    payload,
  };
};
