/**
 *
 * Tests for App selectors
 *
 */

import isEmpty from 'lodash/fp/isEmpty';

import { makeSelectAuthenticate, selectAppDomain } from '../selectors';

describe('selectAppDomain', () => {
  it('should select the app state', () => {
    const appState = {
      token: 'testToken',
      refreshToken: 'testRefreshToken',
    };
    const mockedState = {
      app: appState,
    };

    expect(selectAppDomain(mockedState)).toEqual(appState);
  });
});

describe('makeSelectAuthenticate', () => {
  const authenticateSelector = makeSelectAuthenticate();
  it('should select authentication', () => {
    const token = 'someToken';
    const mockedState = {
      app: {
        token,
      },
    };
    expect(authenticateSelector(mockedState)).toEqual(!isEmpty(token));
  });
});
