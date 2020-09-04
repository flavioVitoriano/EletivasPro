/**
 *
 * Tests for SignInPage actions
 *
 */

import { signInUser, signInUserError, signInUserSuccess } from '../actions';
import {
  SIGN_IN_USER_FAILURE,
  SIGN_IN_USER_REQUEST,
  SIGN_IN_USER_SUCCESS,
} from '../constants';

describe('SignInPage actions', () => {
  describe('signInUser', () => {
    it('should return the correct type and the passed userData', () => {
      const userData = {
        email: 'test@test.com',
        password: 'testPassword',
      };
      const expected = {
        type: SIGN_IN_USER_REQUEST,
        userData,
      };
      expect(signInUser(userData)).toEqual(expected);
    });
  });

  describe('signInUserSuccess', () => {
    it('should return the correct type and the passed token', () => {
      const token = 'testToken';
      const expected = {
        type: SIGN_IN_USER_SUCCESS,
        token,
      };
      expect(signInUserSuccess(token)).toEqual(expected);
    });
  });

  describe('signInUserError', () => {
    it('should return the correct type and the passed token', () => {
      const error = 'testError';
      const expected = {
        type: SIGN_IN_USER_FAILURE,
        error,
      };
      expect(signInUserError(error)).toEqual(expected);
    });
  });
});
