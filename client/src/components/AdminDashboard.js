import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Expenses from './Expenses';


const AdminDashboard = ({ expenseList, authorized }) => (
  <div>
  {authorized === false ? <Card className="expense-container">
    <CardTitle
      title="Admin Dashboard"
      subtitle="You are not an administrator!"
    />
  </Card> : <Card className="expense-container">
    <CardTitle
      title="Admin Dashboard"
      subtitle="You can see all expenses from here!"
    />
    {expenseList.length === 0 && <CardText style={{ fontSize: '16px', color: 'green' }}>{'No expenses to show, please create some!'}</CardText>}
  </Card>}
  
    {expenseList.length > 0 ? <Expenses expenseList={expenseList} admin={true}/> : <div />}
  </div>
);

AdminDashboard.propTypes = {
  expenseList: PropTypes.array.isRequired
};

export default AdminDashboard;