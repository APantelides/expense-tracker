const path = require('path');

module.exports = (app, express) => {

  

  
  app.use(express.static(path.join(__dirname, '../../client/public')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/public', 'index.html'));
  });
};