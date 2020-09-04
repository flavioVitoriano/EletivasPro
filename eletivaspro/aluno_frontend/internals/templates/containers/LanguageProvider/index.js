/**
 *
 * LanguageProvider
 *
 * This component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `src/translations`)
 *
 */

import PropTypes from 'prop-types';
import React, { Children } from 'react';
import { IntlProvider } from 'react-intl';
import messages from 'translations';
import { flattenMessages } from 'utils/common';
import { useSelector } from 'utils/hooks';

import { makeSelectLocale } from './selectors';

const LanguageProvider = ({ children }) => {
  const locale = useSelector(makeSelectLocale());
  return (
    <IntlProvider
      key={locale}
      locale={locale}
      messages={flattenMessages(messages[locale])}
      defaultLocale={locale}
    >
      {Children.only(children)}
    </IntlProvider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default LanguageProvider;
