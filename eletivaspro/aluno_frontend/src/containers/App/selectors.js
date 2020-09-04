/**
 *
 * App selectors
 *
 */

import isEmpty from 'lodash/fp/isEmpty';
import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the app state domain
 */

const selectAppDomain = state => state.app || initialState;

/**
 * Other specific selectors
 */

const makeSelectAuthenticate = () =>
  createSelector(selectAppDomain, appState => !isEmpty(appState.token));

/**
 * Other specific selectors
 */

const selectToken = state => state.app.token;

/**
 * Default selector used by App
 */

const makeSelectApp = () =>
  createSelector(selectAppDomain, subState => subState);

export default makeSelectApp;
export { selectAppDomain, makeSelectAuthenticate, selectToken };
