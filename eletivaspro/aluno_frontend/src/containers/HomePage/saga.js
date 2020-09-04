/**
 *
 * HomePage saga
 *
 */

import * as api from 'api';
import { call, put, takeLatest } from 'redux-saga/effects';

import { getUserError, getUserSuccess } from './actions';
import { GET_USER_REQUEST } from './constants';

/**
 * Reqres user request/response handler
 */
export function* getUser({ id }) {
  try {
    const response = yield call(api.placeholder.getUser, id);
    yield put(getUserSuccess(response.data.data));
  } catch ({ response }) {
    yield put(getUserError(response.status));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* homePageSaga() {
  // Watches for GET_USER_REQUEST actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_USER_REQUEST, getUser);
}
