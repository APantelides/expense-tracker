const jwt = require('jsonwebtoken');
const {User} = require('../../database/db-config.js');
const config = require('../config/keys.js').jwtSecret;


module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  let token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  jwt.verify(token, config, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    let userId = decoded.sub;


    // check if a user exists
    User.find({where: {_id: userId } }).then((user) => {
      if (!user) {
        return res.status(401).end();
      }
      return next(null);

    }).catch((err) => {

      if (err) {
        return res.status(401).end();
      }
    });
  });
};
