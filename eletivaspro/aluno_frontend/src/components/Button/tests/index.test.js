/**
 *
 * Tests for Button
 *
 */

import React from 'react';
import { fireEvent, render } from 'utils/testLibrary';

import Button from '../index';

describe('<Button />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Button />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should render an <button> tag', () => {
    const { container } = render(<Button />);
    expect(container.querySelector('button')).toBeInTheDocument();
  });

  it('should have text content when text is passed as child', () => {
    const text = 'Test';
    const { container } = render(<Button>{text}</Button>);
    expect(container.querySelector('button')).toHaveTextContent(text);
  });

  it('should trigger onClick event when the button is clicked', () => {
    const onClickSpy = jest.fn();
    const { container } = render(<Button onClick={onClickSpy} />);
    fireEvent.click(container.querySelector('button'));
    expect(onClickSpy).toHaveBeenCalled();
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Button />);
    expect(firstChild).toMatchSnapshot();
  });
});
