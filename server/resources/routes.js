const path = require('path');
const controller = require('../database/controllers.js');
const passport = require('passport');
const validator = require('validator');

module.exports = (app, express) => {

//authentication routes
  app.post('/auth/signup', (req, res, next) => {
    const validationResult = validateSignupForm(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false, 
        message: validationResult.message, 
        errors: validationResult.errors 
      });
    }

    return passport.authenticate('local-signup', (user) => {
      if (user.errors) {
        const err = user.errors[0];
        if (err.path === 'email') {
          
          return res.status(409).json({
            success: false, 
            message: 'Email already in use!', 
            errors: { email: 'This email is already taken.' 
          }});
        }
        if (err.path === 'userName') {
          return res.status(409).json({
            success: false, 
            message: 'User name already in use!', 
            errors: { userName: 'This user name is already taken.' 
          }});
        }

        return res.status(400).json({ 
          success: false, 
          message: 'Could not process the form.' 
        });
      }
      return res.status(200).json({ 
        success: true, 
        message: 'You have successfully signed up! Now you should be able to log in.' 
      });
    })(req, res, next);
  });

  app.post('/auth/login', (req, res, next) => {
    const validationResult = validateLoginForm(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        success: false, 
        message: validationResult.message, 
        errors: validationResult.errors 
      });
    }

    return passport.authenticate('local-login', (err, token, userData) => {
      if (err) {
        if (err.name === 'IncorrectCredentialsError') {
          return res.status(400).json({ 
            success: false, 
            message: err.message 
          });
        }

        return res.status(400).json({ 
          success: false, 
          message: 'Could not process the form.' 
        });
      }

      return res.json({ 
        success: true, 
        message: 'You have successfully logged in!', 
        token: token, 
        user: userData 
      });
    })(req, res, next);
  });


  app.get('/api/dashboard', (req, res, next) => {
    return res.status(200).json({ message: 'You\'re authorized to see this secret message.'});
  });


  app.use(express.static(path.join(__dirname, '../../client/public')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/public', 'index.html'));
  });
};

//***** Functions (non database) *******

//validate Signup form
var validateSignupForm = (payload) => {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!payload || typeof payload.userName !== 'string' || payload.userName.trim().length === 0) {
    isFormValid = false;
    errors.userName = 'Please provide your name.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};


//validate Login form
var validateLoginForm = (payload) => {
  const isFormValid = true;
  const errors = {};
  const message = '';

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
