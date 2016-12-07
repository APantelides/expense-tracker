var Sequelize = require('sequelize');
const {dbInfo} = require('../resources/config/keys');

//connect to postgres using Sequelize
var db = new Sequelize(dbInfo);

//overwrite existing database... remove once we are going to start testing front end!
//db.sync({force: true});

//build the tables
const {user} = require('./schemas/user.js')(db, Sequelize);
//const {expense} = require('./schemas/expense.js')(db, Sequelize);

//define relationships here if needed


module.exports = {db, user, /* expense */ };