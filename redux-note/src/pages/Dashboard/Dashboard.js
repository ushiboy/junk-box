/* @flow */
import { connect } from 'react-redux';
import React from 'react';
import NoteList from '../../components/NoteList/NoteList';
import { fetchMyNotes } from '../../modules/dashboard';
import { create } from '../../modules/note';
import Button from '../../components/Button/Button';
import type { Note, Action } from '../../types';

type Props = {
  notes: Array<Note>,
  params: {
    id: string
  },
  dispatch: (action: any) => any,
  children: React.Element<any>
}

export class Dashboard extends React.Component {

  props: Props;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMyNotes());
  }

  render() {
    const { notes, children, params } = this.props;
    const note = notes.find(n => n.id === Number(params.id));
    return (
      <div className="page-Dashboard row">
        <div className="page-Dashboard-list col-xs-3">
          <div className="page-Dashboard-listHeader">
            <Button onClick={this.handleClickNew.bind(this)}>New Note</Button>
          </div>
          <div role="navigation">
            <NoteList notes={notes} selectedNoteId={params.id} />
          </div>
        </div>
        <div className="page-Dashboard-main col-xs-9">
          {children ? React.cloneElement(children, { note }) : null }
        </div>
      </div>
    );
  }

  handleClickNew() {
    this.props.dispatch(create());
  }

}

const ConnectedDashboard = connect(({ dashboard }) => dashboard)(Dashboard);
export default ConnectedDashboard;
