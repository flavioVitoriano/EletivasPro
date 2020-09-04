/**
 *
 * Combine all reducers in this file and export the combined reducers.
 *
 */

import { connectRouter } from 'connected-react-router';
import AppReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import { combineReducers } from 'redux';
import history from 'utils/history';

/**
 * Merges the main reducer with the router state
 */
const rootReducer = combineReducers({
  router: connectRouter(history),
  languageProvider: languageProviderReducer,
  app: AppReducer,
});

export { rootReducer };
