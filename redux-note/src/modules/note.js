/* @flow */
import type { Action, Note, NewNote } from '../types';
import * as webapi from '../utils/webapi';

export const BEFORE_FETCH = 'note/fetch/before';
export const FETCH = 'note/fetch';
export const CREATE = 'note/create';
export const UPDATE = 'note/update';
export const DELETE = 'note/delete';

export type NoteState = {
  note: NewNote
}

export type NotePayload = {
  note: Note
}

/**
 * Reducer
 */

export function initState(): NoteState {
  const note = {
    note: {
      title: '',
      body: ''
    }
  };
  return note;
}

function beforeFetchNote(state: NoteState, action: Action<any>): NoteState {
  return initState();
}

function fetchedNote(state: NoteState, action: Action<NotePayload>): NoteState {
  return { note: action.payload.note }
}

export default function reducer(state: NoteState = initState(), action: Action<*>): NoteState {
  switch (action.type) {
    case BEFORE_FETCH:
      return beforeFetchNote(state, action);
    case FETCH:
      return fetchedNote(state, action);
  }
  return state
}

/**
 * Action
 */

export async function fetch(id: number): Promise<Action<NotePayload>> {
  const note = await webapi.fetchNote(id);
  return {
    type: FETCH,
    payload: {
      note
    }
  };
}

export async function create(): Promise<Action<NotePayload>>{
  const note = await webapi.createNote();
  return {
    type: CREATE,
    payload: {
      note
    }
  };
}

export async function update(note: Note): Promise<Action<NotePayload>>{
  const updatedNote = await webapi.updateNote(note);
  return {
    type: UPDATE,
    payload: {
      note: updatedNote
    }
  };
}
