/**
 *
 * HomePage selectors
 *
 */

import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.homePage || initialState;

/**
 * Other specific selectors
 */

const makeSelectCounter = () =>
  createSelector(selectHomePageDomain, ({ counter }) => counter);

const makeSelectUser = () =>
  createSelector(
    selectHomePageDomain,
    ({ user: { firstName, lastName, email } }) => ({
      name: `${firstName} ${lastName}`,
      email,
    }),
  );

const makeSelectError = () =>
  createSelector(selectHomePageDomain, ({ error }) => error);

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () =>
  createSelector(selectHomePageDomain, subState => subState);

export default makeSelectHomePage;
export {
  selectHomePageDomain,
  makeSelectCounter,
  makeSelectUser,
  makeSelectError,
};
