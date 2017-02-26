/* @flow */
import { connect } from 'react-redux';
import React from 'react';
import NoteList from '../../components/NoteList/NoteList';
import { fetchMyNotes } from '../../modules/dashboard';

export class Dashboard extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMyNotes());
  }

  render() {
    const { notes } = this.props;
    return (
      <div className="page-Dashboard-main">
        <NoteList notes={notes} />
      </div>
    );
  }

}

const ConnectedDashboard = connect(({ dashboard }) => dashboard)(Dashboard);
export default ConnectedDashboard;
