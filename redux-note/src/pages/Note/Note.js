/* @flow */
import { connect } from 'react-redux';
import React from 'react';
import NoteBody from '../../components/NoteBody/NoteBody';
import type { Note } from '../../types';
import { fetch } from '../../modules/note';

type Props = {
  note: Note,
  params: {
    id: string
  },
  dispatch: (action: any) => any,
}

export class NotePage extends React.Component {

  props: Props;

  componentDidMount() {
    this.props.dispatch(fetch(Number(this.props.params.id)));
  }

  render() {
    const { note } = this.props;
    if (!note || !note.id) return null;

    const { body } = note;

    return (
      <div className="page-Note">
        <NoteBody body={body} />
      </div>
    );
  }

}

const ConnectedNote = connect(({ note }) => note)(NotePage);
export default ConnectedNote;
