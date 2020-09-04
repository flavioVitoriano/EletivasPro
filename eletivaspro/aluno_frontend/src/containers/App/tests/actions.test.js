/**
 *
 * Tests for App actions
 *
 */

import { loginUser, loginUserSuccess, logoutUser } from '../actions';
import { LOGIN, LOGIN_SUCCESS, LOGOUT } from '../constants';

describe('App actions', () => {
  describe('loginUser', () => {
    it('should return the correct type and the passed token', () => {
      const token = 'testToken';
      const expected = {
        type: LOGIN,
        token,
      };
      expect(loginUser(token)).toEqual(expected);
    });
  });

  describe('loginUserSuccess', () => {
    it('should return the correct type', () => {
      const expected = {
        type: LOGIN_SUCCESS,
      };
      expect(loginUserSuccess()).toEqual(expected);
    });
  });

  describe('logoutUser', () => {
    it('should return the correct type', () => {
      const expected = {
        type: LOGOUT,
      };
      expect(logoutUser()).toEqual(expected);
    });
  });
});
