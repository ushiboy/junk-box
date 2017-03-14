/* @flow */
import React from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment'
import Button from '../Button/Button';
import StarButton from '../StarButton/StarButton';

export default class NoteHeader extends React.Component {

  render() {
    const { title, updated, starred } = this.props.note;
    return (
      <div className="NoteHeader">
        <h1 className="NoteHeader-title">{title}</h1>
        <div className="NoteHeader-meta">
          <span className="NoteHeader-updated">{moment(updated).format('YYYY-M-D H:mm:ss')}</span>
        </div>
        <div className="NoteHeader-buttons">
          <Button onClick={this.handleClickEdit.bind(this)}>Edit</Button>
          <StarButton starred={starred} onChange={this.props.onChangeStar}/>
        </div>
      </div>
    );
  }

  handleClickEdit() {
    browserHistory.push(`/notes/${this.props.note.id}/edit`);
  }

}
