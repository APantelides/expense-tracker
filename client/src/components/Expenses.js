import React, { PropTypes } from 'react';
import Expense from './Expense';
import SimpleExpense from './SimpleExpense';

const Expenses = ({ expenseList, admin }) => (
  <div className='expense-list'>
  {expenseList.map((expense, index) => {
    return admin ? (
      <SimpleExpense key={index} expense={expense} />
      ) : (
      <Expense key={index} expense={expense} />
    );
  })}
  </div>
);

Expenses.propTypes = {
  expenseList: PropTypes.array.isRequired
};

export default Expenses;