/**
 *
 * Tests for LanguageProvider reducer
 *
 */

import produce from 'immer';
import messages from 'translations';
import { DEFAULT_USER_LOCALE } from 'utils/locale';

import { changeLocale } from '../actions';
import languageProviderReducer from '../reducer';

const locale = DEFAULT_USER_LOCALE(messages);

describe('languageProviderReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      locale,
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(languageProviderReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeLocale action correctly', () => {
    const frLocale = 'fr';
    const expectedResult = produce(state, draft => {
      draft.locale = frLocale;
    });

    expect(languageProviderReducer(state, changeLocale(frLocale))).toEqual(
      expectedResult,
    );
  });
});
