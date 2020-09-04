/**
 *
 * SignInPage saga
 *
 */

import { push } from 'connected-react-router';
import { paths } from 'containers/RoutesProvider/routes';
import { SIGN_IN_USER_SUCCESS } from 'containers/SignInPage/constants';
import { put, takeLatest } from 'redux-saga/effects';

import { loginUser, loginUserSuccess } from './actions';

export function* login({ token }) {
  yield put(loginUser(token));
  yield put(loginUserSuccess());
  yield put(push(paths.homePage));
}

export default function* appSaga() {
  yield takeLatest(SIGN_IN_USER_SUCCESS, login);
}
