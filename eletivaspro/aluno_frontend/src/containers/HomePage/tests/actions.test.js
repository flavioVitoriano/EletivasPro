/**
 *
 * Tests for HomePage actions
 *
 */

import {
  addCounter,
  getUser,
  getUserError,
  getUserSuccess,
  subtractCounter,
} from '../actions';
import {
  ADD_COUNTER,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  SUBTRACT_COUNTER,
} from '../constants';

describe('HomePage actions', () => {
  describe('addCounter', () => {
    it('should return the correct type', () => {
      const expected = {
        type: ADD_COUNTER,
      };
      expect(addCounter()).toEqual(expected);
    });
  });

  describe('subtractCounter', () => {
    it('should return the correct type', () => {
      const expected = {
        type: SUBTRACT_COUNTER,
      };
      expect(subtractCounter()).toEqual(expected);
    });
  });

  describe('getUser', () => {
    it('should return the correct type and the passed id', () => {
      const id = 0;
      const expected = {
        type: GET_USER_REQUEST,
        id,
      };
      expect(getUser(id)).toEqual(expected);
    });
  });

  describe('getUserSuccess', () => {
    it('should return the correct type and the passed user', () => {
      const user = {
        name: 'Test Name',
        email: 'test@test.com',
      };
      const expected = {
        type: GET_USER_SUCCESS,
        user,
      };
      expect(getUserSuccess(user)).toEqual(expected);
    });
  });

  describe('getUserError', () => {
    it('should return the correct type and the passed user', () => {
      const error = 'testError';
      const expected = {
        type: GET_USER_FAILURE,
        error,
      };
      expect(getUserError(error)).toEqual(expected);
    });
  });
});
