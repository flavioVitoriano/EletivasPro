import includes from 'lodash/includes';
import keys from 'lodash/keys';

export const EN_LANGUAGE = 'en';
export const FR_LANGUAGE = 'fr';
export const PT_LANGUAGE = 'pt';

export const locales = [EN_LANGUAGE, FR_LANGUAGE, PT_LANGUAGE];

export const messages = {
  [EN_LANGUAGE]: EN_LANGUAGE,
  [FR_LANGUAGE]: FR_LANGUAGE,
  [PT_LANGUAGE]: PT_LANGUAGE,
};

export const DEFAULT_BROWSER_LOCALE =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

export const DEFAULT_APP_LOCALE = PT_LANGUAGE;

export const DEFAULT_USER_LOCALE = availableTranslations =>
  includes(keys(availableTranslations), DEFAULT_BROWSER_LOCALE)
    ? DEFAULT_BROWSER_LOCALE
    : DEFAULT_APP_LOCALE;
