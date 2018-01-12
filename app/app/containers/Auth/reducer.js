/*
 *
 * Auth reducer
 *
 */

import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  LOGIN_USER,
} from './constants';

const initialState = fromJS({
  errorValidator: () => {}
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
      console.log("Yeah");
    // case: 
    default:
      return state;
  }
}

export default authReducer;
