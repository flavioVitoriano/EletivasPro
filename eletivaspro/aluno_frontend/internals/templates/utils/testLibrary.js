import { render } from '@testing-library/react';
import LanguageProvider from 'containers/LanguageProvider';
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store';

const AllTheProviders = ({ children }) => (
  <Provider store={store}>
    <LanguageProvider>{children}</LanguageProvider>
  </Provider>
);

AllTheProviders.propTypes = {
  children: PropTypes.node,
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

const HooksWrapper = ({ children, hooks }) => children(hooks());

export * from '@testing-library/react';

// override render method
export { HooksWrapper, customRender as render };
