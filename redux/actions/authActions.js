import { Router } from '../../routes';
import axios from 'axios';
import { AUTHENTICATE, DEAUTHENTICATE } from '../types';
import { API } from '../../config';
import { setCookie, removeCookie } from '../../utils/cookie';

// logs/registers user -> depends on type-parameter
const authenticate = ({ username, password }, type) => {
  if (type !== 'signin' && type !== 'signup') {
    throw new Error('Wrong API call!');
  }
  return dispatch => {
    axios
      .post(`${API}/${type}`, { username, password })
      .then(response => {
        // saving the received token in the cookies
        setCookie('token', response.data.token);
        // dispatching action to redux
        dispatch({ type: AUTHENTICATE, payload: response.data.token });
        // forwarding user to overview-page
        Router.pushRoute('/');
      })
      .catch(err => {
        throw new Error(err);
      });
  };
};

const reauthenticate = token => {
  return dispatch => {
    dispatch({ type: AUTHENTICATE, payload: token });
  };
};
// logging out user and removing token from cookies
const deauthenticate = () => {
  return dispatch => {
    // removing cookie/token
    removeCookie('token');
    // dispatching action to redux
    dispatch({ type: DEAUTHENTICATE });
    // forwarding user to signin-page
    Router.pushRoute('signin');
  };
};

export default {
  authenticate,
  reauthenticate,
  deauthenticate
};
