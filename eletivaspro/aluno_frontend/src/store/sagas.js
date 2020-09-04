import appSaga from 'containers/App/saga';
import homePageSaga from 'containers/HomePage/saga';
import signInPageSaga from 'containers/SignInPage/saga';
import { fork } from 'redux-saga/effects';

export function* rootSaga() {
  yield fork(appSaga);
  yield fork(homePageSaga);
  yield fork(signInPageSaga);
}
