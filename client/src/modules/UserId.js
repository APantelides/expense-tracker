class UserId {
  //Get a token value.
  static getId() {
    return localStorage.getItem('userId');
  }

}

export default UserId;