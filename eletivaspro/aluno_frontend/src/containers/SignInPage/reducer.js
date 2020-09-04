/**
 *
 * SignInPage reducer
 *
 */

import produce from 'immer';

import {
  SIGN_IN_USER_FAILURE,
  SIGN_IN_USER_REQUEST,
  SIGN_IN_USER_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  hasError: false,
  error: null,
};

const signInPageReducer = produce((draft, action) => {
  switch (action.type) {
    case SIGN_IN_USER_REQUEST:
      draft.loading = true;
      break;
    case SIGN_IN_USER_FAILURE:
      draft.loading = false;
      draft.hasError = true;
      draft.error = action.error;
      break;
    case SIGN_IN_USER_SUCCESS:
      return initialState;
    default:
  }
}, initialState);

export default signInPageReducer;
