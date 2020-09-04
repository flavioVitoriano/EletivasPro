/**
 *
 * Tests for LanguageProvider selectors
 *
 */

import { makeSelectLocale, selectLanguageProviderDomain } from '../selectors';

describe('selectLanguageProviderDomain', () => {
  it('should select the app state', () => {
    const localeState = {
      locale: 'fr',
    };
    const mockedState = {
      languageProvider: localeState,
    };

    expect(selectLanguageProviderDomain(mockedState)).toEqual(localeState);
  });
});

describe('selectLanguageProviderDomain', () => {
  const localeSelector = makeSelectLocale();
  it('should select locale', () => {
    const locale = 'fr';
    const mockedState = {
      languageProvider: {
        locale,
      },
    };
    expect(localeSelector(mockedState)).toEqual(locale);
  });
});
