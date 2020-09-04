/**
 *
 * Tests for Select
 *
 */

import React from 'react';
import { render } from 'utils/testLibrary';

import Select from '../index';

describe('<Select />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Select />);
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
    } = render(<Select />);
    expect(firstChild).toMatchSnapshot();
  });
});
