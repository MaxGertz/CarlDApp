import {Router} from '../../routes';
import axios from 'axios';
import { AUTHENTICATE, DEAUTHENTICATE } from '../types';
import { API } from '../../config';
import { setCookie, removeCookie } from '../../utils/cookie';

const authenticate = ({ username, password }, type) => {
	if (type !== 'signin' && type !== 'signup') {
		throw new Error('Wrong API call!');
	}
	return (dispatch) => {
		axios.post(`${API}/${type}`, { username, password })
			.then((response) => {
				setCookie('token', response.data.token);
				dispatch({ type: AUTHENTICATE, payload: response.data.token });
				Router.pushRoute('/');

			})
			.catch((err) => {
				throw new Error(err);
			});
	};
};

const reauthenticate = (token) => {
	return (dispatch) => {
		dispatch({ type: AUTHENTICATE, payload: token });
	};
};

const deauthenticate = () => {
	return (dispatch) => {
		removeCookie('token');
		// TODO: edit route
		Router.pushRoute('/signin');
		dispatch({ type: DEAUTHENTICATE });
	};
};

export default {
	authenticate,
	reauthenticate,
	deauthenticate
};
