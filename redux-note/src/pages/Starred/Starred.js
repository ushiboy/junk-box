/* @flow */
import { connect } from 'react-redux';
import React from 'react';
import { fetchStarred } from '../../modules/starred';
import StarredNoteList from '../../components/StarredNoteList/StarredNoteList';
import type { Note, Action } from '../../types';

type Props = {
  notes: Array<Note>,
  dispatch: (action: any) => any
}

export class Starred extends React.Component {

  props: Props;

  componentDidMount() {
    this.props.dispatch(fetchStarred());
  }

  render() {
    const { notes } = this.props;
    return (
      <div className="page-Stars">
        <h1>Starred Notes</h1>
        <StarredNoteList notes={notes} />
      </div>
    );
  }

}

const ConnectedStarred = connect(({ starred }) => starred)(Starred);
export default ConnectedStarred;
