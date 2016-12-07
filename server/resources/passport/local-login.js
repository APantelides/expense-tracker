const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    };

    // find a user by email address
    user.findOne({where: {email: userData.email}}).then((err, user) => {
      if (err) { return done(err); }

      if (!user) {
        let error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';
        return done(error);
      }

      // check if a hashed user's password is equal to a value saved in the database
      user.comparePassword(userData.password, (err, isMatch) => {
        if (err) { 
          return done(err); 
        }

        if (!isMatch) {
          let error = new Error('Incorrect email or password');
          error.name = 'IncorrectCredentialsError';
          return done(error);
        }


        let payload = {
          sub: user._id,
        };
        // create a token string
        let token = jwt.sign(payload, config.jwtSecret);

        let userData = {
          name: user.userName
        };

        return done(null, token, userData);
      });
    });
  });

};