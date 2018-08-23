import Router from 'next/router';
import axios from 'axios';
import { AUTHENTICATE, DEAUTHENTICATE } from '../types';
import { API } from '../../config';
import { setCookie, removeCookie } from '../../utils/cookie';

const authenticate = ({ username, password }, type) => {
	if (type !== 'signin' && type !== 'signup') {
		throw new Error('Wrong API call!');
	}
	return (dispatch) => {
		console.log(username, password);
		axios.post(`${API}/${type}`, { username, password })
			.then((response) => {
				setCookie('token', response.data.token);
				// TODO: edit to correct route!
				Router.push('/');
				dispatch({ type: AUTHENTICATE, payload: response.data.token });
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
		Router.push('/');
		dispatch({ type: DEAUTHENTICATE });
	};
};

export default {
	authenticate,
	reauthenticate,
	deauthenticate
};