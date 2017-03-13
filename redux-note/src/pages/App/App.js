/* @flow */
import React from 'react';
import GlobalHeader from '../../components/GlobalHeader/GlobalHeader';

export default class App extends React.Component {

  render() {
    const { location } = this.props;
    return (
      <div className="page-App">
        <div className="page-App-header">
          <GlobalHeader location={location} />
        </div>
        <div className="page-App-main container-fluid">
          {this.props.children}
        </div>
      </div>
    );
  }

}
