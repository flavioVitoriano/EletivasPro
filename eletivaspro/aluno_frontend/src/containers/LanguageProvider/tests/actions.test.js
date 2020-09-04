/**
 *
 * Tests for LanguageProvider actions
 *
 */

import { changeLocale } from '../actions';
import { CHANGE_LOCALE } from '../constants';

describe('LanguageProvider actions', () => {
  describe('changeLocale', () => {
    it('should return the correct type', () => {
      const expected = {
        type: CHANGE_LOCALE,
      };
      expect(changeLocale()).toEqual(expected);
    });
  });
});
