import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { MAKE_LOGIN_USER_REQUEST, MAKE_SIGNUP_USER_REQUEST } from './constants';
import request from 'utils/request';
import { loginUser } from "./actions";
import { makeSelectNotificationSystem } from "containers/App/selectors";
import { reposLoaded, repoLoadingError } from 'containers/App/actions';
import { setTimeout } from 'timers';
import { makeSelectAuthenticatedUser } from "./selectors";


// Individual exports for testing
export function* doLoginRequest(payload) {
  console.log("On Login Saga")
  // See example in containers/HomePage/saga.js
  var authenticatedUser = yield select(makeSelectAuthenticatedUser());
  const notificationSystem = yield select(makeSelectNotificationSystem());
  const requestURL = `/api/authentication/login`;

  try {
    // Call our request helper (see 'utils/request')
    authenticatedUser = {
      name: "victor",
      email: "test"
    }
    let user = yield select(makeSelectAuthenticatedUser())
    const response = yield call(request, requestURL, {method: 'POST', body: JSON.stringify(payload.credentials)});
    console.log(response);
    if(response) {
      yield put(loginUser(response));
      notificationSystem.addNotification({
        message: "Successfully logged in",
        level: "success"
      })
    }
    
    // yield put(reposLoaded(repos, username));
  } catch (err) {
    console.log(err);
    handleError(err, notificationSystem);
    // yield put()
    // yield put(repoLoadingError(err));
  }
}

export function* doSignupRequest(payload) {
  console.log("On Signup Saga")
  // See example in containers/HomePage/saga.js
  var authenticatedUser = yield select(makeSelectAuthenticatedUser());
  const notificationSystem = yield select(makeSelectNotificationSystem());
  const requestURL = `/api/authentication/register`;

  try {
    // Call our request helper (see 'utils/request')
    authenticatedUser = {
      name: "victor",
      email: "test"
    }
    let user = yield select(makeSelectAuthenticatedUser())
    const response = yield call(request, requestURL, {method: 'POST', body: JSON.stringify(payload.credentials)});
    console.log(response);
    if(response) {
      notificationSystem.addNotification({
        message: "Successfully registered",
        level: "success"
      })
    }
    
    // yield put(reposLoaded(repos, username));
  } catch (err) {
    console.log(err);
    handleError(err, notificationSystem);
    // yield put()
    // yield put(repoLoadingError(err));
  }
}

function handleError(err, notificationSystem){
  try {
    let res = err.response;
    if(res) {
      return res.json().then(res => {
        notificationSystem.addNotification({
          message: res.message || "Error",
          level: 'error'
        });
      }).catch(err => {
        throw new Error();
      });
    }
    throw new Error();
  } catch (error) {
    notificationSystem.addNotification({
      message: "Error",
      level: 'error'
    });
  }
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
// export default function request(url, options) {
//   return fetch(url, options)
//     .then(checkStatus)
//     .then(parseJSON);
// }


/**
 * Root saga manages watcher lifecycle
 */
export default function* makeLoginRequest() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(MAKE_LOGIN_USER_REQUEST, doLoginRequest);
  yield takeLatest(MAKE_SIGNUP_USER_REQUEST, doSignupRequest);
}
