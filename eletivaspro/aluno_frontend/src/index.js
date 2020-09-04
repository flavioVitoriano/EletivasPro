import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

import { ConnectedRouter } from 'connected-react-router';
import App from 'containers/App';
import LanguageProvider from 'containers/LanguageProvider';
import React from 'react';
import { render } from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { history, persistor, store } from 'store';

import * as serviceWorker from './serviceWorker';

const targetElement = document.getElementById('root');

render(
  <Provider store={store} context={ReactReduxContext}>
    <LanguageProvider>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <App context={ReactReduxContext} />
        </ConnectedRouter>
      </PersistGate>
    </LanguageProvider>
  </Provider>,
  targetElement,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
