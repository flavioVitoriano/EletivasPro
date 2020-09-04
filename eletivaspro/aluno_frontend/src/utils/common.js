import produce from 'immer';
import assign from 'lodash/assign';
import isString from 'lodash/isString';
import keys from 'lodash/keys';
import reduce from 'lodash/reduce';

export const flattenMessages = (nestedMessages, prefix = '') =>
  reduce(
    keys(nestedMessages),
    (messages, key) => {
      const value = nestedMessages[key];
      const prefixedKey = prefix ? `${prefix}.${key}` : key;

      if (isString(value)) {
        return produce(messages, draft => {
          draft[prefixedKey] = value;
        });
      }
      return assign(messages, flattenMessages(value, prefixedKey));
    },
    {},
  );
