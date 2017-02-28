/* @flow */
import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import GlobalHeader from '../../components/GlobalHeader/GlobalHeader';

export default class App extends React.Component {

  render() {
    return (
      <div className="page-App">
        <div className="page-App-header">
          <GlobalHeader />
        </div>
        <div className="page-App-main">
          <Dashboard />
        </div>
      </div>
    );
  }

}
