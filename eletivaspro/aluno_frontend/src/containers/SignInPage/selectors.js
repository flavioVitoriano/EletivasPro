/**
 *
 * SignInPage selectors
 *
 */

import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the signInPage state domain
 */

const selectSignInPageDomain = state => state.signInPage || initialState;

/**
 * Other specific selectors
 */

const makeSelectLoading = () =>
  createSelector(
    selectSignInPageDomain,
    ({ loading }) => loading,
  );

/**
 * Default selector used by SignInPage
 */

const makeSelectSignInPage = () =>
  createSelector(
    selectSignInPageDomain,
    subState => subState,
  );

export default makeSelectSignInPage;
export { selectSignInPageDomain, makeSelectLoading };
