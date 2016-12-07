import React, { PropTypes } from 'react';
import ReportForm from '../components/ReportForm.js';
import Auth from '../modules/Auth';
import UserId from '../modules/UserId';


class ReportPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      expenses: [],
      query: {
        startDate: '',
        endDate: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeDate = this.changeDate.bind(this);
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const startDate = encodeURIComponent(this.state.query.startDate);
    const endDate = encodeURIComponent(this.state.query.endDate);
    const userId = encodeURIComponent(UserId.getId());
    const formData = `userId=${userId}&startDate=${startDate}&endDate=${endDate}`;

    //create a fetch request
    fetch('/api/report?' + formData, {
      method: 'get',
      headers: new Headers({
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      })
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((json) => {
          this.setState({
            expenses: json
          });
        });
      } else {
        console.log(res.status);
      }
    });
  }

  changeDate(event) {
    const field = event.target.name;
    const query = this.state.query;
    query[field] = event.target.value;

    this.setState({
      query
    });
  }

  render() {
    const weeks = Math.ceil((Date.parse(this.state.query.endDate) - Date.parse(this.state.query.startDate)) / 6.048e+8);
  
    var totalExpenses = 0;
    this.state.expenses.forEach((expense) => {
      totalExpenses += parseInt(expense.price);
    });

    const expensesPerWeek = (totalExpenses / weeks).toFixed(2);
    return (

        <ReportForm
          onSubmit={this.processForm}
          onChange={this.changeDate}
          query={this.state.query}
          report={expensesPerWeek}
        />
    );
  }

}

ReportPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ReportPage;