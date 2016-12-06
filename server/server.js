const express = require('express');
const port = 3000; //would add logic to change to 80 if in prod env

var app = express();

require('./resources/middleware.js')(app, express);

require('./resources/routes.js')(app, express);

app.listen(port, () => {
  console.log('App listening on port: ' + port);
});

module.exports = {app};