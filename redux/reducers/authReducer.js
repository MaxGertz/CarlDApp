import { AUTHENTICATE, DEAUTHENTICATE } from '../types';

const initialState = {
  token: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      // saves token to state
      return { token: action.payload };
    case DEAUTHENTICATE:
      // removes token from state
      return { token: null };
    default:
      return state;
  }
};
