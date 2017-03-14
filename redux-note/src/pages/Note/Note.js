/* @flow */
import { connect } from 'react-redux';
import React from 'react';
import NoteBody from '../../components/NoteBody/NoteBody';
import NoteHeader from '../../components/NoteHeader/NoteHeader';
import type { Note } from '../../types';
import { fetch, createStar, deleteStar } from '../../modules/note';

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
        <NoteHeader note={note} onChangeStar={this.handleChangeStar.bind(this)} />
        <NoteBody body={body} />
      </div>
    );
  }

  handleChangeStar() {
    const { note, dispatch } = this.props;
    const { starred } = note;
    if (starred) {
      dispatch(deleteStar(note));
    } else {
      dispatch(createStar(note));
    }
  }

}

const ConnectedNote = connect(({ note }) => note)(NotePage);
export default ConnectedNote;
