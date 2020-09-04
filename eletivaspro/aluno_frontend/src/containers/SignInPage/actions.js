/**
 *
 * SignInPage actions
 *
 */

import {
  SIGN_IN_USER_FAILURE,
  SIGN_IN_USER_REQUEST,
  SIGN_IN_USER_SUCCESS,
} from './constants';

export const signInUser = userData => ({
  type: SIGN_IN_USER_REQUEST,
  userData,
});

export const signInUserSuccess = token => ({
  type: SIGN_IN_USER_SUCCESS,
  token,
});

export const signInUserError = error => ({
  type: SIGN_IN_USER_FAILURE,
  error,
});
