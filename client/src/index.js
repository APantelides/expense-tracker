// Libs
import React from 'react';
import { render } from 'react-dom';

// SASS
import './css/main.scss';

// Routes
import routes from './router';

// Render
render(
  routes,
  document.getElementById('root')
);