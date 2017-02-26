/* @flow */
import React from 'react';
import type { Note } from '../../types';

type Props = {
  notes: Array<Note>
}

export default class NoteList extends React.Component {

  props: Props;

  renderItem(note: Note) {
    const { id, text } = note;
    return (
      <li key={id}>{text}</li>
    )
  };

  render() {
    const items = this.props.notes.map(this.renderItem);

    return (
      <div className="NoteList">
        <h1>Note List</h1>
        <ul>
          {items}
        </ul>
      </div>
    );
  }

}
