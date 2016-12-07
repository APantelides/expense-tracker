import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Expenses from './Expenses';


const Dashboard = ({ expenseList, removeExpense }) => (
  <div>
  <Card className="expense-container">
    <CardTitle
      title="Expense Dashboard"
      subtitle="You can see your expense report and edit your expenses from here!"
    />
    {expenseList.length === 0 && <CardText style={{ fontSize: '16px', color: 'green' }}>{'No expenses to show, please create some!'}</CardText>}
  </Card>
    {expenseList.length > 0 ? <Expenses expenseList={expenseList} removeExpense={removeExpense}/> : <div />}
  </div>
);

Dashboard.propTypes = {
  expenseList: PropTypes.array.isRequired
};

export default Dashboard;