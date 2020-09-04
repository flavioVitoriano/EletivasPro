/**
 *
 * SignInPage saga
 *
 */

import * as api from 'api';
import { call, put, takeLatest } from 'redux-saga/effects';

import { signInUserError, signInUserSuccess } from './actions';
import { SIGN_IN_USER_REQUEST } from './constants';

export function* signInUser({ userData }) {
  try {
    const response = yield call(api.signIn.signInUser, userData);
    yield put(signInUserSuccess(response.data.token));
  } catch ({ response }) {
    yield put(signInUserError(response.status));
  }
}

export default function* signInPageSaga() {
  // Watches for GET_USER_REQUEST actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(SIGN_IN_USER_REQUEST, signInUser);
}
