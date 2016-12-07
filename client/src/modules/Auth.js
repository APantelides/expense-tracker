class Auth {

  
  // Authenticate a user. Save a token string in Local Storage
   
  static authenticateUser(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', user.userId);
    localStorage.setItem('userName', user.userName);
  }


  //Check if a user is authenticated - check if a token is saved in Local Storage
   
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  
  //Deauthenticate a user. Remove a token from Local Storage.
  
  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  
  //Get a token value.
  static getToken() {
    return localStorage.getItem('token');
  }

}

export default Auth;