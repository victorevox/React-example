import { createSelector } from 'reselect';

/**
 * Direct selector to the auth state domain
 */
const selectServiceDomain = (state) => state.get('services');

/**
 * Other specific selectors
 */
const makeSelectPostService = () => createSelector(selectServiceDomain, (servicesState) => {
  return servicesState.get('postService');
})


/**
 * Default selector used by Auth
 */

const makeSelectServices = () => createSelector(
  selectServiceDomain,
  (substate) => substate.toJS()
);


export default makeSelectServices;
export {
  selectServiceDomain,
  makeSelectServices,
  makeSelectPostService
};
