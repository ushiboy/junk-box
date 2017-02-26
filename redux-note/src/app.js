/* @flow */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './pages/App/App';
import store from './store';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
