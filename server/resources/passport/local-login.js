const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {user} = require('../../database/db-config.js');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../config/keys.js').jwtSecret;

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
  };

  // find a user by email address
  user.findOne({where: {email: userData.email}}).then((user) => {
    
    console.log(user);
    if (!user) {
      const error = new Error('Incorrect email');
      error.name = 'IncorrectCredentialsError';
      return done(error);
    }

    // check if a hashed user's password is equal to a value saved in the database
    user.comparePassword(userData.password, user.password, (err, isMatch) => {
      if (err) { 
        return done(err); 
      }

      if (!isMatch) {
        const error = new Error('Incorrect password');
        error.name = 'IncorrectCredentialsError';
        return done(error);
      }


      const payload = {
        sub: user._id,
      };
      // create a token string
      const token = jwt.sign(payload, config);

      const userData = {
        userName: user.userName
      };
      return done(null, token, userData);
    });
  })
  .catch((err) => {
    if (err) { return done(err); }
  });
});