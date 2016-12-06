
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
};