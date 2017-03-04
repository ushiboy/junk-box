/* @flow */
import React from 'react';
import type { Note } from '../../../types';

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
    const { title } = note;
    return (
      <div>{title}</div>
    );
  }

}
