/**
 *
 * App actions
 *
 */

import { LOGIN, LOGIN_SUCCESS, LOGOUT } from './constants';

export const loginUser = token => ({
  type: LOGIN,
  token,
});

export const loginUserSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const logoutUser = () => ({
  type: LOGOUT,
});
