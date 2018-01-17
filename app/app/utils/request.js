import 'whatwg-fetch';
import { merge } from "lodash";
import { AuthHelper } from "utils/auth";

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  let defaults = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if(AuthHelper.isAuthenticated()) {
    let token = AuthHelper.getToken();
    if(token) defaults.headers["Authorization"] = token;
  }
  let finalOptions = merge(defaults, options);
  return fetch(url, finalOptions)
    .then(checkStatus)
    .then(parseJSON);
}
