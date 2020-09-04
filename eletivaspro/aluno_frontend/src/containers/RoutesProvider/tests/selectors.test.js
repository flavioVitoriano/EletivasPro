/**
 *
 * Tests for RoutesProvider selectors
 *
 */

import { makeSelectLocation, selectRouterProviderDomain } from '../selectors';

describe('selectRouterProviderDomain', () => {
  it('should select the router state', () => {
    const routerState = {
      location: {
        pathname: '/',
      },
    };
    const mockedState = {
      router: routerState,
    };

    expect(selectRouterProviderDomain(mockedState)).toEqual(routerState);
  });
});

describe('makeSelectLocation', () => {
  const locationSelector = makeSelectLocation();
  it('should select the location', () => {
    const location = {
      pathname: '/',
    };
    const mockedState = {
      router: {
        location,
      },
    };
    expect(locationSelector(mockedState)).toEqual(location);
  });
});
