/**
 *
 * Create the store with dynamic reducers
 *
 */

import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import history from 'utils/history';

import { rootReducer } from './reducers';
import { rootSaga } from './sagas';

// Create redux store with history
const initialState = {};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app', 'languageProvider'],
};

const composeEnhancers =
  process.env.NODE_ENV === 'development' ? composeWithDevTools : compose;

const sagaMiddleware = createSagaMiddleware();

// Create the store with two middlewares
// 1. sagaMiddleware: Makes redux-sagas work
// 2. routerMiddleware: Syncs the location/URL path to the state
const middlewares = [sagaMiddleware, routerMiddleware(history)];
const enhancers = [applyMiddleware(...middlewares)];
const composedEnhancers = composeEnhancers(...enhancers);

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer, // root reducer with router state
  initialState,
  composedEnhancers,
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor, history };
