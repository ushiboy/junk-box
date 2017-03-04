/* @flow */
import React from 'react';
import { Link } from 'react-router';

export default class GlobalHeader extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">Note</Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className="active"><Link to="/"><span className="glyphicon glyphicon-dashboard" aria-hidden="true"></span> Dashboard</Link></li>
              <li><Link to="/starred">Starred</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

}
