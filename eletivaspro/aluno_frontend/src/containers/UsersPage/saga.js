import { call, put, takeLatest } from '@redux-saga/core/effects';
import * as api from 'api';

import {
  deleteUserError,
  deleteUserSuccess,
  getUserError,
  getUserSuccess,
} from './actions';
import {
  DELETE_USERS_REQUEST,
  GET_USER_REQUEST,
  GET_USERS_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  SAVE_USERS_FAILURE,
  SAVE_USERS_REQUEST,
  SAVE_USERS_SUCCESS,
  UPDATE_USERS_FAILURE,
  UPDATE_USERS_REQUEST,
  UPDATE_USERS_SUCCESS,
} from './constants';

/**
 *
 * UsersPage saga
 *
 */

export function* getUsers() {
  try {
    const response = yield call(api.placeholder.getUsers);
    yield put({ type: GET_USERS_SUCCESS, payload: response.data });
  } catch ({ response }) {
    yield put({ type: GET_USERS_FAILURE, payload: response.status });
  }
}

export function* getUser({ id }) {
  try {
    const response = yield call(api.placeholder.getUser, id);
    yield put(getUserSuccess(response.data));
  } catch ({ response }) {
    yield put(getUserError(response.status));
  }
}

export function* deleteUser({ payload }) {
  try {
    yield call(api.placeholder.deleteUser, payload);
    yield put(deleteUserSuccess(payload));
  } catch ({ response }) {
    yield put(deleteUserError(response.status));
  }
}

export function* saveUser({ payload }) {
  try {
    const response = yield call(api.placeholder.saveUser, payload);
    yield put({ type: SAVE_USERS_SUCCESS, payload: response.data });
  } catch ({ response }) {
    yield put({ type: SAVE_USERS_FAILURE, payload: response.status });
  }
}

export function* updateUser({ payload }) {
  try {
    const response = yield call(
      api.placeholder.updateUser,
      payload.id,
      payload,
    );
    yield put({ type: UPDATE_USERS_SUCCESS, payload: response.data });
  } catch ({ response }) {
    yield put({ type: UPDATE_USERS_FAILURE, payload: response.status });
  }
}

// Individual exports for testing
export default function* groupsPageSaga() {
  yield takeLatest(GET_USERS_REQUEST, getUsers);
  yield takeLatest(SAVE_USERS_REQUEST, saveUser);
  yield takeLatest(UPDATE_USERS_REQUEST, updateUser);
  yield takeLatest(GET_USER_REQUEST, getUser);
  yield takeLatest(DELETE_USERS_REQUEST, deleteUser);
}
