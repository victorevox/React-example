/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => {
  return state.get('global')
};

const selectRoute = (state) => state.get('route');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

const makeSelectGlobal = () => createSelector(
  selectGlobal,
  (globalState) => globalState
)

const makeSelectNotificationSystem = () => createSelector(selectGlobal, (globalState) => {
  return globalState.get('notificationSystem');
})

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectLocation,
  makeSelectNotificationSystem,
  makeSelectGlobal
};
