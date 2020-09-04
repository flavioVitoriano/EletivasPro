/**
 *
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

const HomePage = () => (
  <div>
    <FormattedMessage id="containers.homePage.header" />
  </div>
);

export default HomePage;
