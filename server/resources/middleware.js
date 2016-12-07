const config = require('./config/keys.js').jwtSecret;
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');


module.exports = (app, express) => {
  // app can parse JSON body messages
  app.use(bodyParser.json());
  // app can parse HTTP body messages
  app.use(bodyParser.urlencoded({ extended: false }));
  //passport middleware
  app.use(passport.initialize());

  //check auth to be able to use api
  const authCheckMiddleware = require('./passport/auth-check.js')(config);
  app.use('/api', authCheckMiddleware);
};