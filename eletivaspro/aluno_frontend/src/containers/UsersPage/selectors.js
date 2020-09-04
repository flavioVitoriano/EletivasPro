/**
 *
 * UsersPage selectors
 *
 */

import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectUsersPageDomain = state => state.usersPage || initialState;

const makeSelectLoading = () =>
  createSelector(selectUsersPageDomain, ({ loading }) => loading);

const makeSelectUsers = () =>
  createSelector(selectUsersPageDomain, subState => subState.users);

const makeSelectUser = () =>
  createSelector(selectUsersPageDomain, subState => subState.user);

export default makeSelectUsers;
export {
  selectUsersPageDomain,
  makeSelectUsers,
  makeSelectLoading,
  makeSelectUser,
};
