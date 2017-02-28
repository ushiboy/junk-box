/* @flow */
import 'babel-polyfill';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './pages/App/App';
import Dashboard from './pages/Dashboard/Dashboard';
import Note from './pages/Note/Note';
import Starred from './pages/Starred/Starred';
import store from './store';

function Root(props) {
  return (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );
}

render(
  <Router history={browserHistory}>
    <Route component={Root}>
      <Route path="/" component={Dashboard} />
      <Route path="notes/:id" component={Note} />
      <Route path="starred" component={Starred} />
    </Route>
  </Router>,
  document.getElementById('app')
);
