/* @flow */
import React from 'react';
import type { Note } from '../../../types';
import Button from '../../../components/Button/Button';
import { update } from '../../../modules/note';

type Props = {
  note: Note,
  params: {
    id: number
  },
  dispatch: (action: any) => any
}

type State = {
  note: Note
}

export default class NoteEdit extends React.Component {

  props: Props;

  state: State;

  constructor(props: Props) {
    super(props);
    const { note } = props;
    this.state = {
      note
    }
  }

  componentWillReceiveProps(props: Props) {
    this.setState({
      note: props.note
    });
  }

  render() {
    const { note } = this.state;
    if (!note) return null;

    const { title, body } = note;
    return (
      <div className="page-NoteEdit">
        <div className="page-NoteEdit-header">
          <input className="form-control" type="text" name="title" value={title} onChange={this.onChangeField.bind(this)} />
          <div className="page-NoteEdit-buttons">
            <Button onClick={this.handleSave.bind(this)}>Save</Button>
            <Button onClick={this.handleDelete.bind(this)}>Delete</Button>
          </div>
        </div>
        <div className="page-NoteEdit-body">
          <label htmlFor="note-body" className="u-for-at">本文</label>
          <textarea className="form-control" id="note-body" name="body" value={body} onChange={this.onChangeField.bind(this)}></textarea>
        </div>
        <div className="page-NoteEdit-preview">

        </div>
      </div>
    );
  }

  onChangeField(e: { target: { name: string, value: string } }) {
    const { name, value } = e.target;
    this.setState({
      note: Object.assign({}, this.state.note, {
        [name]: value
      })
    });
  }

  handleSave() {
    this.props.dispatch(update(this.state.note));
  }

  handleDelete() {
  }

}
