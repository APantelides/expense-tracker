import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import { browserHistory } from 'react-router';
import Update from 'material-ui/svg-icons/action/update';
import Delete from 'material-ui/svg-icons/action/delete';
import Auth from '../modules/Auth';
import UserId from '../modules/UserId';

const currencySymbols = {
  USD: '$'
};

const userId = encodeURIComponent(UserId.getId());
const formData = `userId=${userId}`;

const deleteExpense = (expenseId, callback) => {
  fetch('/api/expense/' + expenseId, {
    method: 'DELETE',
    headers: new Headers({
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${Auth.getToken()}`
    }),
    body: formData
  }).then((res) => {
    callback(expenseId);
    console.log(res);
  }).catch((err) => {
    console.log(err);
  });
};


const Expense = ({ expense, index, removeExpense }) => (
  <div className='expense-item'>
    <div>{'Expense Id: ' + expense.id}</div>
    <div>{'Date: ' + expense.date.split('T')[0]}</div>
    <div>{'Description: ' + expense.description}</div>
    <div>{'Price: ' + currencySymbols[expense.currency] + Number(expense.price).toFixed(2)}</div>
    <div>
      <IconButton onTouchTap={()=> {
        browserHistory.push(`/editExpense/${expense.id}`);
      }}>
        <Update hoverColor='#1976d2' />
      </IconButton>
      <IconButton onTouchTap={()=> {
        deleteExpense(expense.id, removeExpense);
      }}>
        <Delete hoverColor='#1976d2' />
      </IconButton>
    </div>
  </div>
);

Expense.propTypes = {
  expense: PropTypes.object.isRequired
};

export default Expense;