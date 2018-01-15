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
              console.log("decoded user is:");
              console.log(user); 
            }
            return user;
          } catch (error) {
            throw new Error("Error while decoding user information");
          }
    }
}