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
    const { notes, children } = this.props;
    const note = notes.find(n => n.id === Number(this.props.params.id));
    return (
      <div className="page-Dashboard">
        <div className="page-Dashboard-list">
          <NoteList notes={notes} />
        </div>
        <div className="page-Dashboard-main">
          {children ? React.cloneElement(children, { note }) : null }
        </div>
      </div>
    );
  }

}

const ConnectedDashboard = connect(({ dashboard }) => dashboard)(Dashboard);
export default ConnectedDashboard;
