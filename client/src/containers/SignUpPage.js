import React, { PropTypes } from 'react';
import SignUpForm from '../components/SignUpForm.js';


class SignUpPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        userName: '',
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
    const userName = encodeURIComponent(this.state.user.userName);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `userName=${userName}&email=${email}&password=${password}`;

    //create a fetch request
    fetch('/auth/signup', {
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

          localStorage.setItem('successMessage', json.message);

          this.context.router.replace('/login');
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
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignUpPage;