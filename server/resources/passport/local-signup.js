const {user} = require('../../database/db-config.js');
const passportLocalStrategy = require('passport-local').Strategy;

module.exports = (config) => {
  return new passportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
  }, (req, email, password, done) => {
    let userData = {
      email: email.trim(),
      password: password.trim(),
      userName: req.body.userName.trim()
    };

    let newUser = new user(userData);
    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      return done(null);
    });
  });
  
};