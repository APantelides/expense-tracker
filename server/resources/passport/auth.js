const passport = require('passport');

module.exports = (config) => {

  const localSignupStrategy = require ('./local-signup')(config);
  const localLoginStrategy = require('./local-login')(config);

  passport.use('local-signup', localSignupStrategy);
  passport.use('local-login', localLoginStrategy);
};