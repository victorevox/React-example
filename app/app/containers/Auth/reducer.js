/*
 *
 * Auth reducer
 *
 */

import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { makeSelectNotificationSystem } from "containers/App/selectors";

import {
  LOGIN_USER,
} from './constants';

const initialState = fromJS({
  notification: makeSelectNotificationSystem()
});
// const initialState = {
//   errorValidator: () => {}
// };

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      console.log("reducer!!!!!!!!!!!!!!");
      console.log(state);
      return state;
    case LOCATION_CHANGE:
      if(action && action.payload && /\/authenticate/.test(action.payload.pathname)) {
        if(!action.payload.search) {
          console.log("its empty");
          console.log(state);
          return state
          .set('location', 'search', 'asdsdasd')
        }
      }
      console.log("Yeah");
      console.log(action);
    // case: 
    default:
      return state;
  }
}

export default authReducer;
