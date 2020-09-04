/**
 *
 * HomePage actions
 *
 */

import {
  ADD_COUNTER,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  SUBTRACT_COUNTER,
} from './constants';

export const addCounter = () => ({
  type: ADD_COUNTER,
});

export const subtractCounter = () => ({
  type: SUBTRACT_COUNTER,
});

export const getUser = id => ({
  type: GET_USER_REQUEST,
  id,
});

export const getUserSuccess = user => ({
  type: GET_USER_SUCCESS,
  user,
});

export const getUserError = error => ({
  type: GET_USER_FAILURE,
  error,
});
