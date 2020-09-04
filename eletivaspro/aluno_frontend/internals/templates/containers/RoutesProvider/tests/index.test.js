/**
 *
 * Tests for RoutesProvider
 *
 */

import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { history } from 'store';
import { render } from 'utils/testLibrary';

import RoutesProvider from '../index';

describe('<RoutesProvider />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    render(
      <ConnectedRouter history={history}>
        <RoutesProvider dispatch={dispatch} />
      </ConnectedRouter>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Expect to have additional unit tests specified', () => {
    // TODO: Implement unit tests
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <ConnectedRouter history={history}>
        <RoutesProvider />
      </ConnectedRouter>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
