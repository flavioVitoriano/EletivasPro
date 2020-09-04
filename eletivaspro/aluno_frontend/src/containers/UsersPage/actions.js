import {
  DELETE_USERS_FAILURE,
  DELETE_USERS_REQUEST,
  DELETE_USERS_SUCCESS,
  GET_RULES_REQUEST,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USERS_REQUEST,
  SAVE_USERS_REQUEST,
  UPDATE_USERS_REQUEST,
} from './constants';

export const getUsersRequest = () => ({
  type: GET_USERS_REQUEST,
});

export const saveUsersRequest = payload => ({
  type: SAVE_USERS_REQUEST,
  payload,
});

export const updateUsersRequest = payload => ({
  type: UPDATE_USERS_REQUEST,
  payload,
});

export const getRulesRequest = () => ({
  type: GET_RULES_REQUEST,
});

export const getUserRequest = id => ({
  type: GET_USER_REQUEST,
  id,
});

export const deleteUserRequest = payload => ({
  type: DELETE_USERS_REQUEST,
  payload,
});

export const deleteUserSuccess = payload => ({
  type: DELETE_USERS_SUCCESS,
  payload,
});

export const deleteUserError = payload => ({
  type: DELETE_USERS_FAILURE,
  payload,
});

export const getUserSuccess = payload => ({
  type: GET_USER_SUCCESS,
  payload,
});

export const getUserError = payload => ({
  type: GET_USER_FAILURE,
  payload,
});
