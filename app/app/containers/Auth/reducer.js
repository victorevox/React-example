/*
 *
 * Auth reducer
 *
 */

import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { SET_NOTIFICATION_SYSTEM } from "containers/App/constants";
import { AuthHelper } from "utils/auth";

import {
  LOGIN_USER, AUTH_LOGOUT,
} from './constants';

const initialState = fromJS({
  notificationSystem: null,
  authenticatedUser: null
});

function authReducer(state = initialState, action, a) {
  switch (action.type) {
    case LOGIN_USER:
      console.log("Auth Reducer login");
      console.log(state);
      try {
        let user = null;
        let token = action.token;
        user = AuthHelper.decodeUserFromToken(token);
        AuthHelper.saveToken(token);
        return state.set('authenticatedUser', user);
      } catch (error) {
        const notificationSystem = state.get('notificationSystem');
        notificationSystem.addNotification({
          message: error && error.message ? error.message : "Error",
          level: "error"
        })
      }
      return state;
    case AUTH_LOGOUT:
      console.log("login out");
      AuthHelper.removeToken();
      return state.set('authenticatedUser', null);
    case SET_NOTIFICATION_SYSTEM: {
      return state.set('notificationSystem', action.notificationSystem)
    }

    default:
      return state;
  }
}

export default authReducer;
