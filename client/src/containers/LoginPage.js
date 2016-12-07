import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm.js';


class LoginPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    //create a fetch request
    fetch('/auth/login', {
      method: 'post',
      headers: new Headers({
        'Content-type': 'application/x-www-form-urlencoded'
      }),
      body: formData
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((json) => {

          this.setState({
            errors: {}
          });

          Auth.authenticateUser(json.token);

          this.context.router.replace('/');
        });
      } else {
        res.json().then((json) => {
          this.setState({
            errors: {summary: json.message}
          });
        });
      }
    });
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
    );
  }

}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginPage;