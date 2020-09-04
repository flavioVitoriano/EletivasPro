/**
 *
 * Tests for LanguageProvider
 *
 */

import { changeLocale } from 'containers/LanguageProvider/actions';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { store } from 'store';
import { fireEvent, getByTestId, render } from 'utils/testLibrary';

import LanguageProvider from '../index';

const { dispatch } = store;

jest.mock('translations', () => ({
  en: {
    test: 'Test',
    validations: {},
  },
  fr: {
    test: 'Tester',
    validations: {},
  },
}));

const renderComponent = () =>
  render(
    <>
      <button
        data-testid="frenchButton"
        type="button"
        onClick={() => dispatch(changeLocale('fr'))}
      >
        French
      </button>
      <button
        data-testid="englishButton"
        type="button"
        onClick={() => dispatch(changeLocale('en'))}
      >
        English
      </button>
      <FormattedMessage tagName="title" id="test" />
    </>,
  );

describe('<LanguageProvider />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const action = jest.fn();
    render(
      <LanguageProvider dispatch={action}>
        <div>Test</div>
      </LanguageProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('should translate to English when english button is clicked', () => {
    const { container, test = 'Test' } = renderComponent();
    fireEvent.click(getByTestId(container, 'englishButton'));
    expect(container.querySelector('title')).toHaveTextContent(test);
  });

  it('should translate to French when french button is clicked', () => {
    const { container, test = 'Tester' } = renderComponent();
    fireEvent.click(getByTestId(container, 'frenchButton'));
    expect(container.querySelector('title')).toHaveTextContent(test);
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <LanguageProvider>
        <div>Test</div>
      </LanguageProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
