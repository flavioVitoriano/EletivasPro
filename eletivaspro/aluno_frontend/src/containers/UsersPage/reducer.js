/* eslint-disable no-duplicate-case */
/**
 *
 * UsersPage reducer
 *
 */

import produce from 'immer';
import filter from 'lodash/filter';

import {
  DELETE_USERS_FAILURE,
  DELETE_USERS_SUCCESS,
  GET_RULES_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  GET_USERS_SUCCESS,
  SAVE_USERS_FAILURE,
  SAVE_USERS_SUCCESS,
  UPDATE_USERS_FAILURE,
  UPDATE_USERS_SUCCESS,
} from './constants';

export const initialState = {
  users: [],
  rules: [],
  user: {
    name: '',
    rules: [],
  },
};

const usersPageReducer = produce((draft, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      draft.users = action.payload;
      break;
    case GET_RULES_SUCCESS:
      draft.rules = action.payload;
      break;
    case SAVE_USERS_SUCCESS:
      break;
    case SAVE_USERS_FAILURE:
      draft.loading = false;
      draft.hasError = true;
      draft.error = action.payload;
      break;
    case UPDATE_USERS_SUCCESS:
      break;
    case UPDATE_USERS_FAILURE:
      draft.loading = false;
      draft.hasError = true;
      draft.error = action.payload;
      break;
    case GET_USER_SUCCESS:
      draft.user = action.payload;
      break;
    case GET_USER_FAILURE:
      draft.loading = false;
      draft.hasError = true;
      draft.error = action.payload;
      break;
    case DELETE_USERS_SUCCESS:
      draft.users = filter(draft.users, ({ id }) => id !== action.payload);
      break;
    case DELETE_USERS_FAILURE:
      draft.loading = false;
      draft.hasError = true;
      draft.error = action.payload;
      break;
    default:
  }
}, initialState);

export default usersPageReducer;
