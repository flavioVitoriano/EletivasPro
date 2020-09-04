import appSaga from 'containers/App/saga';
import { fork } from 'redux-saga/effects';

export function* rootSaga() {
  yield fork(appSaga);
}
