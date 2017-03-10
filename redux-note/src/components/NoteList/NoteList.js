/* @flow */
import React from 'react';
import { Link } from 'react-router';
import type { Note } from '../../types';
import moment from 'moment'

type Props = {
  notes: Array<Note>,
  selectedNoteId: string
}

export default class NoteList extends React.Component {

  props: Props;

  renderItem(note: Note) {
    const classNames = ['NoteList-item', 'list-group-item'];
    if (Number(this.props.selectedNoteId) === note.id) {
      classNames.push('active');
    }
    const { id, title, updated } = note;
    return (
      <Link to={`/notes/${id}/edit`} key={id} className={classNames.join(' ')}>
        <span className="NoteList-title">{title}</span>
        <span className="NoteList-updated">{moment(updated).format('YYYY-M-D H:mm:ss')}</span>
      </Link>
    )
  };

  render() {
    const items = this.props.notes.map(this.renderItem.bind(this));
    return (
      <div className="NoteList list-group">
        {items}
      </div>
    );
  }

}
