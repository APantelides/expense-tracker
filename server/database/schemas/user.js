const bcrypt = require('bcrypt');
module.exports = (db, Sequelize) => {
  const user = db.define('users', {
    _id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    userName: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true, //make it so that sequelize doesn't modify table name
    instanceMethods: { //define method for comparing a password
      comparePassword: (password, userPassword, callback) => {
        return bcrypt.compare(password, userPassword, callback);
      }
    },
    hooks: {
      beforeCreate: (user, fields, next) => {
        if (!user.changed('password')) {
          return next();
        }

        bcrypt.genSalt((err, salt) => {
          if (err) {
            return next(err);
          }
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
              return next(err);
            }
            //replace password string with hash
            user.password = hash;
            return next();
          });
        });
      }
    }
  }
  );
  return {
    user: user
  };
};