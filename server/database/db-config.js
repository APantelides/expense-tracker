var Sequelize = require('sequelize');
var db = new Sequelize('postgres://system:password@127.0.0.1:5432/expense-tracker');

module.exports = {db};