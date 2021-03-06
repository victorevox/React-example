import { Array } from "core-js/library/web/timers";
import { isArray } from "lodash";
export class AuthHelper {
    
    /**
     * 
     * @param {string} token Authentication token to be saved 
     */
    static saveToken(token) {
        if(localStorage && token) {
            localStorage.setItem("auth-token", token)
        }
    }

    /**
     * @returns {string} Return the token saved on local storage
     */
    static getToken() {
        let token = null;
        if(localStorage) {
            token = localStorage.getItem('auth-token');
        }
        return token;
    }

    /**
     * Removes Auth token from session
     */
    static removeToken() {
        if(localStorage) {
            localStorage.removeItem('auth-token');
        }
    }

    /**
     * Return an object containing user information decoded from Auth token
     * @param {string} token Authentication token
     * @returns {object}
     */
    static decodeUserFromToken(token) {
        try {
            let user = null;
            let userEncoded = token && token.split('.') && token.split('.')[1];
            if(userEncoded) {
              user = atob && atob(userEncoded);
              user = user && JSON.parse(user);
            //   console.log("decoded user is:", user); 
            }
            return user;
          } catch (error) {
            throw new Error("Error while decoding user information");
          }
    }

    static isAuthenticated(role, user) {
        try {
            let user = user || AuthHelper.decodeUserFromToken(AuthHelper.getToken());
            if(!user) return false;
            if(!role) return true;
            if(user && user.roles) {
                if(typeof role == "string") {
                    return user.roles.indexOf(role) !== -1;
                } else if (isArray(role)) {
                    let assert = role.reduce((prev, current) => {
                        return prev * user.roles.indexOf(current) !== -1;
                    }, 1)
                    return assert;
                }
            }
            return false
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}