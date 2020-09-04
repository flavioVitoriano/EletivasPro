/**
 *
 * Tests for SignInPage saga
 *
 */

import { push } from 'connected-react-router';
import { paths } from 'containers/RoutesProvider/routes';
import { SIGN_IN_USER_SUCCESS } from 'containers/SignInPage/constants';
import { put, takeLatest } from 'redux-saga/effects';

import { loginUser, loginUserSuccess } from '../actions';
import appSaga, { login } from '../saga';

describe('app Saga', () => {
  const token = 'testToken';
  const loginGenerator = login({ token });

  it('should call the actions in the correct order when the login generator is called', () => {
    const putDescriptorLoginUser = loginGenerator.next().value;
    const putDescriptorLoginUserSuccess = loginGenerator.next().value;
    const putDescriptorHomePage = loginGenerator.next().value;
    expect(putDescriptorLoginUser).toEqual(put(loginUser(token)));
    expect(putDescriptorLoginUserSuccess).toEqual(put(loginUserSuccess()));
    expect(putDescriptorHomePage).toEqual(put(push(paths.homePage)));
  });
});

describe('signInPageSaga Saga', () => {
  const appDataSaga = appSaga();

  it('should start task to watch for SIGN_IN_USER_REQUEST action', () => {
    const takeLatestDescriptor = appDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(SIGN_IN_USER_SUCCESS, login),
    );
  });
});
