const {User, db, Sequelize, Expense} = require('./db-config.js');

module.exports = {
  readExpenses: (req, res) => {
    User.findOne({where: {_id: req.params.userId}}).then((user) => {
      Expense.findAll({where: {userId: user._id}}).then((expenses) => {
        res.status(200).send(expenses);
      }).catch((err) => {
        res.status(404).send(err);
      });
    }); 
  },
  readExpense: (req, res) => {
    Expense.findOne({where: {id: req.params.id}}).then((expense)=> {
      res.status(200).send(expense);
    }).catch((err) => {
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
    });
  },
  updateExpense: (req, res) => {
    console.log(req);
    Expense.findOne({where: {id: req.body.id}}).then((expense) => {
      if (parseInt(req.body.userId) === expense.userId) {
        expense.update({
          price: req.body.price,
          description: req.body.description
        }).then((updated) => {
          res.status(200).send(updated);
        });
      } else {
        res.sendStatus(404);
      }
      
    }).catch((err) => {
      res.status(404).send(err);
    });
  },
  deleteExpense: (req, res) => {
    Expense.findOne({where: {id: req.params.id}}).then((expense) => {
      if (parseInt(req.body.userId) === expense.userId) {
        expense.destroy({});
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    }).catch((err) => {
      res.status(404).send(err);
    });
  }
};