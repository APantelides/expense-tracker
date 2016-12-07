import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.js';


class DashboardPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      secretData: ''
    };
  }

  componentDidMount() {
    //use native fetch to test authentication
    fetch('/api/dashboard', {
      method: 'get',
      headers: new Headers({
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      })
    }).then((res) => {
      res.json().then((json) => {
        this.setState({
          secretData: json.message
        });
      });
      
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (<Dashboard secretData={this.state.secretData} />);
  }

}

export default DashboardPage;