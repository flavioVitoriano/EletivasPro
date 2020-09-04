/**
 *
 * RoutesProvider selectors
 *
 */

import { createSelector } from 'reselect';

/**
 * Direct selector to the routesProvider state domain
 */

const selectRouterProviderDomain = state => state.router;

/**
 * Other specific selectors
 */

const makeSelectLocation = () =>
  createSelector(
    selectRouterProviderDomain,
    routerState => routerState.location,
  );

/**
 * Default selector used by RoutesProvider
 */

const makeSelectRouterProvider = () =>
  createSelector(selectRouterProviderDomain, subState => subState);

export default makeSelectRouterProvider;
export { selectRouterProviderDomain, makeSelectLocation };
