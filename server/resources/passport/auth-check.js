const jwt = require('jsonwebtoken');
const {user} = require('../../database/db-config.js');


module.exports = function(config) {

  return (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).end();
    }

    // get the last part from a authorization header string like "bearer token-value"
    let token = req.headers.authorization.split(' ')[1];

    // decode the token using a secret key-phrase
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      // the 401 code is for unauthorized status
      if (err) { return res.status(401).end(); }

      let userId = decoded.sub;

      // check if a user exists
      user.find({where: {id: userId } }).then((err, user) => {
        if (err || !user) {
          return res.status(401).end();
        }

        return next();

      });
    });

  };

};