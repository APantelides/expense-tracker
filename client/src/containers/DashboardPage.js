import React from 'react';
import Auth from '../modules/Auth';
import UserId from '../modules/UserId';
import Dashboard from '../components/Dashboard.js';


class DashboardPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      expenseList: []
    };

    this.removeExpense = this.removeExpense.bind(this);
  }

  removeExpense(expenseId) {
    this.setState({
      expenseList: this.state.expenseList.filter((expense) => {
        return expense.id !== expenseId;
      })
    });
  }

  componentDidMount() {
    //use native fetch to test authentication
    fetch('/api/expenses/' + UserId.getId(), {
      method: 'get',
      headers: new Headers({
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      })
    }).then((res) => {
      res.json().then((json) => {
        this.setState({
          expenseList: json
        });
      });
      
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (<Dashboard expenseList={this.state.expenseList} removeExpense={this.removeExpense} />);
  }

}

export default DashboardPage;