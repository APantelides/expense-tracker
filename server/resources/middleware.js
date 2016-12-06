
var bodyParser = require('body-parser');
var path = require('path');


module.exports = (app, express) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
};