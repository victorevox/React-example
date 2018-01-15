import { createSelector } from 'reselect';

/**
 * Direct selector to the auth state domain
 */
const selectAuthDomain = (state) => state.get('auth');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Auth
 */

const makeSelectAuth = () => createSelector(
  selectAuthDomain,
  (substate) => substate.toJS()
);

const makeSelectAuthenticatedUser = () => createSelector(selectAuthDomain, (authState) => {
  return authState.get('authenticatedUser');
})

export default makeSelectAuth;
export {
  selectAuthDomain,
  makeSelectAuth,
  makeSelectAuthenticatedUser
};
