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
  SET_NOTIFICATION_SYSTEM
} from './constants';
import { LOGIN_USER } from "containers/Auth/constants";
import { makeSelectNotificationSystem } from "./selectors";
import { createStructuredSelector } from 'reselect';

// The initial state of the App
const initialState = fromJS({
  notificationSystem: null,
  authenticatedUser: null, 
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case SET_NOTIFICATION_SYSTEM: 
      return state
        .set('notificationSystem', action.notificationSystem);
    case LOGIN_USER: 
      console.log("Appreducer login");
      console.log(state);
      try {
        let user = null;
        let userEncoded = action.token && action.token.split('.') && action.token.split('.')[1];
        if(userEncoded) {
          user = atob && atob(userEncoded);
          user = user && JSON.parse(user);
          console.log("decoded user is:");
          console.log(user);
          
        }
        return state.set('authenticatedUser', user);
      } catch (error) {
        const notificationSystem = state.get('notificationSystem');
        notificationSystem.addNotification({
          message: "Error in reducer",
          level: "Error"
        })
      }
      return state;
      
    default:
      return state;
  }
}

export default appReducer;
