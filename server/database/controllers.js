const {User, db, Sequelize, Expense} = require('./db-config.js');

module.exports = {
  readExpenses: (req, res) => {
    User.findOne({where: {_id: req.params.userId}}).then((user) => {
      Expense.find({where: {userId: user._id}}).then((expenses) => {
        console.log(expenses);
        res.status(200).send(expenses);
      }).catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
    }); 
  },
  readExpense: (req, res) => {
    Expense.findOne({where: {id: req.params.id}}).then((expense)=> {
      console.log(expense);
      res.status(200).send(expense);
    }).catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
  },
  createExpense: (req, res) => {
    User.findOne({where: {_id: req.body.userId}}).then((user) => {
      Expense.create({
        price: req.body.price,
        description: req.body.description,
        userId: user._id
      }).then((created) => {
        res.status(200).send(created);
      });
    }).catch((err) => {
      res.status(404).send(err);
      console.log(err);
    });
  },
  updateExpense: (req, res) => {
    Expense.findOne({where: {id: req.body.id}}).then((expense) => {
      expense.update({
        price: req.body.price,
        description: req.body.description
      }).then((updated) => {
        res.status(200).send(updated);
      });
    }).catch((err) => {
      res.status(404).send(err);
      console.log(err);
    });
  },
  deleteExpense: (req, res) => {
    Expense.destroy({where: {id: req.body.id}}).then((deleted) => {
      res.sendStatus(200);
    }).catch((err) => {
      res.status(404).send(err);
      console.log(err);
    });
  }
};