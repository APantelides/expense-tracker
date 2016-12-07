import React, { PropTypes } from 'react';
import Expense from './Expense';

const Expenses = ({ expenseList, removeExpense }) => (
  <div className='expense-list'>
  {expenseList.map((expense, index) => {
    return (
      <Expense index={index + 1} key={index} expense={expense} removeExpense={removeExpense} />
    );
  })}
  </div>
);

Expenses.propTypes = {
  expenseList: PropTypes.array.isRequired
};

export default Expenses;