/*
 *
 * Auth actions
 *
 */

import {
  LOGIN_USER,
  MAKE_LOGIN_USER_REQUEST,
  MAKE_SIGNUP_USER_REQUEST,
  AUTH_LOGOUT
} from './constants';

export function loginUser(data) {
  return {
    type: LOGIN_USER,
    data,
    token: data && data.token
  };
}

export function logout() {
  return {
    type: AUTH_LOGOUT
  }
}

export function makeLoginUserRequest(credentials) {
  return {
    type: MAKE_LOGIN_USER_REQUEST,
    credentials
  };
}

export function makeSignupUserRequest(credentials) {
  return {
    type: MAKE_SIGNUP_USER_REQUEST,
    credentials
  };
}