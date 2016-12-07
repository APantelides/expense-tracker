const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const session = require('express-session');


module.exports = (app, express) => {
  
  // app can parse JSON body messages
  app.use(bodyParser.json());
  // app can parse HTTP body messages
  app.use(bodyParser.urlencoded({ extended: false }));
 
  //passport middleware
  app.use(passport.initialize());

  const localSignupStrategy = require ('./passport/local-signup');
  const localLoginStrategy = require('./passport/local-login');

  passport.use('local-signup', localSignupStrategy);
  passport.use('local-login', localLoginStrategy);

  //check auth to be able to use api
  const authCheckMiddleware = require('./passport/auth-check.js');
  app.use('/api', authCheckMiddleware);
};