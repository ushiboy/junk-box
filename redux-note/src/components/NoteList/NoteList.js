/* @flow */
import React from 'react';
import { Link } from 'react-router';
import type { Note } from '../../types';

type Props = {
  notes: Array<Note>
}

export default class NoteList extends React.Component {

  props: Props;

  renderItem(note: Note) {
    const { id, title } = note;
    return (
      <Link to={`/notes/${id}/edit`} key={id} className="list-group-item">
        <span className="NoteList-title">{title}</span>
      </Link>
    )
  };

  render() {
    const items = this.props.notes.map(this.renderItem);

    return (
      <div className="NoteList">
        <ul className="list-group">
          {items}
        </ul>
      </div>
    );
  }

}
