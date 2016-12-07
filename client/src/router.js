import App from './components/App.js';
import HomePage from './components/HomePage.js';
import DashboardPage from './containers/DashboardPage.js';
import LoginPage from './containers/LoginPage.js';
import SignUpPage from './containers/SignUpPage.js';
import CreateExpensePage from './containers/CreateExpensePage.js';
import EditExpensePage from './containers/EditExpensePage.js';
import ReportPage from './containers/ReportPage.js';
import Auth from './modules/Auth';



const routes = {
  // base component (wrapper for the whole application).
  component: App,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, DashboardPage);
        } else {
          callback(null, HomePage);
        }
      }
    },

    {
      path: '/createExpense',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, CreateExpensePage);
        } else {
          callback(null, HomePage);
        }
      }
    },

    {
      path: '/editExpense/:id',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, EditExpensePage);
        } else {
          callback(null, HomePage);
        }
      }
    },

    {
      path: '/report',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, ReportPage);
        } else {
          callback(null, HomePage);
        }
      }
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

        // change the current URL to /
        replace('/');
      }
    }

  ]
};

export default routes;