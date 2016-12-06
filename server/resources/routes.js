const path = require('path');
const controller = require('../database/controllers.js');

module.exports = (app, express) => {

  app.get('/auth', (req, res) => { //get list of all users - only for admin

  });

  app.get('/api', (req, res) => {

  });


  app.use(express.static(path.join(__dirname, '../../client/public')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/public', 'index.html'));
  });
};