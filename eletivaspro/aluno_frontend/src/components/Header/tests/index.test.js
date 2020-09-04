/**
 *
 * Tests for Header
 *
 */

import React from 'react';
import { render } from 'utils/testLibrary';

import Header from '../index';

describe('<Header />', () => {
  it('expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Header />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('expect to have additional unit tests specified', () => {
    expect(true).toEqual(false);
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Header />);
    expect(firstChild).toMatchSnapshot();
  });
});
