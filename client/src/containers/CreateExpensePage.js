import React, { PropTypes } from 'react';
import ExpenseForm from '../components/ExpenseForm.js';
import Auth from '../modules/Auth';
import UserId from '../modules/UserId';


class CreateExpensePage extends React.Component {

  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      expense: {
        price: '',
        description: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeExpense = this.changeExpense.bind(this);
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const price = encodeURIComponent(this.state.expense.price);
    const description = encodeURIComponent(this.state.expense.description);
    const userId = encodeURIComponent(UserId.getId());
    const formData = `userId=${userId}&price=${price}&description=${description}`;

    //create a fetch request
    fetch('/api/expense', {
      method: 'post',
      headers: new Headers({
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }),
      body: formData
    }).then((res) => {
      if (res.status === 200) {
        this.context.router.replace('/');
      } else {
        res.json().then((json) => {
          this.setState({
            errors: {summary: json.message}
          });
        });
      }
    });
  }

  changeExpense(event) {
    const field = event.target.name;
    const expense = this.state.expense;
    expense[field] = event.target.value;

    this.setState({
      expense
    });
  }

  render() {
    return (
      <ExpenseForm
        onSubmit={this.processForm}
        onChange={this.changeExpense}
        expense={this.state.expense}
      />
    );
  }

}

CreateExpensePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default CreateExpensePage;