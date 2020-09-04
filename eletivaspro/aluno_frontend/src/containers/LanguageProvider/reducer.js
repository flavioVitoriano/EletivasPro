/**
 *
 * LanguageProvider reducer
 *
 */

import produce from 'immer';
import messages from 'translations';
import { DEFAULT_USER_LOCALE } from 'utils/locale';

import { CHANGE_LOCALE } from './constants';

const locale = DEFAULT_USER_LOCALE(messages);

export const initialState = {
  locale,
};

const languageProviderReducer = produce((draft, action) => {
  if (action.type === CHANGE_LOCALE) {
    draft.locale = action.locale;
  }
}, initialState);

export default languageProviderReducer;
