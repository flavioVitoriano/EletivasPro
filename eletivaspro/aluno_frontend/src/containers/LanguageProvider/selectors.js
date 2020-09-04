/**
 *
 * LanguageProvider selectors
 *
 */

import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the languageProvider state domain
 */

const selectLanguageProviderDomain = state =>
  state.languageProvider || initialState;

/**
 * Other specific selectors
 */

const makeSelectLocale = () =>
  createSelector(
    selectLanguageProviderDomain,
    languageState => languageState.locale,
  );

/**
 * Default selector used by LanguageProvider
 */

const makeSelectLanguageProvider = () =>
  createSelector(
    selectLanguageProviderDomain,
    subState => subState,
  );

export default makeSelectLanguageProvider;
export { selectLanguageProviderDomain, makeSelectLocale };
