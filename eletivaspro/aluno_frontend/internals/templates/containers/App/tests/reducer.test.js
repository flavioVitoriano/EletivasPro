/**
 *
 * Tests for App reducer
 *
 */

import produce from 'immer';

import { loginUser } from '../actions';
import appReducer from '../reducer';

describe('appReducer', () => {
  const token = 'testToken';

  let state;
  beforeEach(() => {
    state = {
      // default state params here
      token: '',
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loginUser action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.token = token;
    });
    expect(appReducer(state, loginUser(token))).toEqual(expectedResult);
  });
});
