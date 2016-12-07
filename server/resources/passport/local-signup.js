const {User} = require('../../database/db-config.js');
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: true,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    userName: req.body.userName.trim()
  };

  User.create(userData).then((err) => {
    return done(null);
  }).catch((err) => {
    if (err) {
      return done(err);
    }
  });
});