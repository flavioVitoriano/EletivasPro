/**
 *
 * Tests for SignInPage saga
 *
 */

import { push } from 'connected-react-router';
import { paths } from 'containers/RoutesProvider/routes';
import { put } from 'redux-saga/effects';

import { loginUser, loginUserSuccess } from '../actions';
import { login } from '../saga';

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
