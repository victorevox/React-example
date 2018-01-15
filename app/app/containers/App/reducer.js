/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  SET_NOTIFICATION_SYSTEM,
  APP_LOADED
} from './constants';
import { LOGIN_USER } from "containers/Auth/constants";
import { AuthHelper } from "utils/auth";
import { AUTH_LOGOUT } from "containers/Auth/constants";

// The initial state of the App
const initialState = fromJS({
  notificationSystem: null,
  loading: false,
  error: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NOTIFICATION_SYSTEM:
      return state
        .set('notificationSystem', action.notificationSystem);
    case APP_LOADED:
      console.log("App loaded");
      let token = AuthHelper.getToken();
      if (token)
        return state;
    default:
      return state;
  }
}

export default appReducer;
