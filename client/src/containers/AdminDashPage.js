import React from 'react';
import Auth from '../modules/Auth';
import UserId from '../modules/UserId';
import AdminDashboard from '../components/AdminDashboard.js';


class AdminDashPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      expenseList: [],
      authorized: false
    };
  }

  componentDidMount() {
    //use native fetch to test authentication
    fetch('/api/adminRead/?userId=' + UserId.getId(), {
      method: 'get',
      headers: new Headers({
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      })
    }).then((res) => {
      res.json().then((json) => {
        this.setState({
          expenseList: json,
          authorized: true
        });
      });
      
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (<AdminDashboard expenseList={this.state.expenseList} authorized={this.state.authorized} />);
  }

}

export default AdminDashPage;