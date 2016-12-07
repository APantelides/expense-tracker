import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import UserId from '../modules/UserId';

const currencySymbols = {
  USD: '$'
};

const userId = encodeURIComponent(UserId.getId());
const formData = `userId=${userId}`;



const SimpleExpense = ({ expense, index, removeExpense }) => (
  <div className='expense-item'>
    <div>{'Expense Id: ' + expense.id}</div>
    <div>{'Expense UserId: ' + expense.userId}</div>
    <div>{'Date: ' + expense.date.split('T')[0]}</div>
    <div>{'Description: ' + expense.description}</div>
    <div>{'Price: ' + currencySymbols[expense.currency] + Number(expense.price).toFixed(2)}</div>
  </div>
);

SimpleExpense.propTypes = {
  expense: PropTypes.object.isRequired
};

export default SimpleExpense;