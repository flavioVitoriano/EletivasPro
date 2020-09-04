/**
 *
 * HomePage reducer
 *
 */

import produce from 'immer';

import {
  ADD_COUNTER,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  SUBTRACT_COUNTER,
} from './constants';

export const initialState = {
  user: {},
  counter: 1,
  error: '',
};

const homePageReducer = produce((draft, action) => {
  switch (action.type) {
    case ADD_COUNTER:
      draft.counter += 1;
      break;
    case SUBTRACT_COUNTER:
      draft.counter -= 1;
      break;
    case GET_USER_REQUEST:
      draft.user = {};
      break;
    case GET_USER_SUCCESS:
      draft.user = action.user;
      draft.error = '';
      break;
    case GET_USER_FAILURE:
      draft.error = action.error;
      break;
    default:
  }
}, initialState);

export default homePageReducer;
