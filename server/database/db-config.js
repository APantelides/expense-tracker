var Sequelize = require('sequelize');
const {dbInfo} = require('../resources/config/keys');

//connect to postgres using Sequelize
var db = new Sequelize(dbInfo);

//overwrite existing database... remove once we are going to start testing front end!
//db.sync({force: true});

//build the tables
const {User} = require('./schemas/user.js')(db, Sequelize);
const {Expense} = require('./schemas/expense.js')(db, Sequelize);

//user to expenses one to many -- defines accessors getExpenses & setExpenses
User.hasMany(Expense, {as: 'Expenses'});

module.exports = {db, User, Expense};