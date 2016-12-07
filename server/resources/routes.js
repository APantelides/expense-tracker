const path = require('path');
const controller = require('../database/controllers.js');
const passport = require('passport');
const validator = require('validator');

module.exports = (app, express) => {

//authentication routes
  app.post('/auth/signup', (req, res, next) => {
    let validationResult = validateSignupForm(req.body);
    if (!validationResult.success) {
      return res.status(400).json({success: false, message: validationResult.message, errors: validationResult.errors });
    }

    passport.authenticate('local-signup', (err, info) => {
      if (err) {
        if (err.code === 23505) {
          console.log('error signing up ->', err, err.name, err.code, '<- error signing up');
          // 23505 is duplicate of unique email error
          return res.status(409).json({success: false, message: 'Check the form for errors.', errors: { email: 'This email is already taken.' }});
        }

        return res.status(400).json({ success: false, message: 'Could not process the form.' });
      }

      return res.status(200).json({ success: true, message: 'You have successfully signed up! Now you should be able to log in.' });
    })(req, res, next);

  });

  app.post('/auth/login', (req, res, next) => {
    let validationResult = validateLoginForm(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ success: false, message: validationResult.message, errors: validationResult.errors });
    }

    passport.authenticate('local-login', (err, token, userData) => {
      if (err) {
        if (err.name === 'IncorrectCredentialsError') {
          return res.status(400).json({ success: false, message: err.message });
        }

        return res.status(400).json({ success: false, message: 'Could not process the form.' });
      }

      return res.json({ success: true, message: 'You have successfully logged in!', token: token, user: userData });

    })(req, res, next);
  });


  app.get('/api', (req, res) => {

  });


  app.use(express.static(path.join(__dirname, '../../client/public')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/public', 'index.html'));
  });
};

//***** Functions (non database) *******

//validate Signup form
var validateSignupForm = (payload) => {
  let isFormValid = true;
  let errors = {};
  let message = '';

  if (!payload.email || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload.password || !validator.isLength(payload.password, 8)) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!payload.userName || payload.userName.trim().length === 0) {
    isFormValid = false;
    errors.userName = 'Please provide your user name.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message: message,
    errors: errors
  };
};


//validate Login form
var validateLoginForm = (payload) => {
  let isFormValid = true;
  let errors = {};
  let message = '';

  if (!payload.email || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (!payload.password || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message: message,
    errors: errors
  };
};
