/**
 *
 * Tests for SignInPage
 *
 */

import React from 'react';
import { render } from 'utils/testLibrary';

import SignInPage from '../index';

describe('<SignInPage />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    render(<SignInPage dispatch={dispatch} />);
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
    } = render(<SignInPage />);
    expect(firstChild).toMatchSnapshot();
  });
});
