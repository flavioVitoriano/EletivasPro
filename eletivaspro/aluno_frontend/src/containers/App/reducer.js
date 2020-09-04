/**
 *
 * App reducer
 *
 */

import produce from 'immer';

import { LOGIN, LOGOUT } from './constants';

export const initialState = {
  token: '',
};

const appReducer = produce((draft, action) => {
  switch (action.type) {
    case LOGIN:
      draft.token = action.token;
      break;
    case LOGOUT:
      return initialState;
    default:
  }
}, initialState);

export default appReducer;
