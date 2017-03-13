/* @flow */
import React from 'react';
import { Link } from 'react-router';
import type { Note } from '../../types';
import moment from 'moment'

type Props = {
  notes: Array<Note>
}

export default class StarredNoteList extends React.Component {

  props: Props;

  renderItem(note: Note) {
    const { id, title, updated } = note;
    return (
      <Link to={`/notes/${id}`} key={id}>
        <div className="page-Stars-title">{title}</div>
        <div className="page-Stars-meta">
          <span className="page-Stars-updated">{moment(updated).format('YYYY-M-D H:mm:ss')}</span>
        </div>
      </Link>
    )
  };

  render() {
    const items = this.props.notes.map(this.renderItem.bind(this));
    return (
      <div className="StarredLinkList list-group">
        {items}
      </div>
    );
  }

}
