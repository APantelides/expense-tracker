module.exports = (db, Sequelize) => {
  const Expense = db.define('expenses', {
    //userId already defined through assosciations
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    currency: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'USD'
    },
    price: {
      type: Sequelize.DECIMAL
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }, {
    freezeTableName: true, //make it so that sequelize doesn't modify table name
  });
  return {
    Expense: Expense
  };
};