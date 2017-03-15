/* @flow */
import type { Action, Note, NewNote } from '../types';
import * as webapi from '../utils/webapi';

export const BEFORE_FETCH = 'note/fetch/before';
export const FETCH = 'note/fetch';
export const CREATE = 'note/create';
export const UPDATE = 'note/update';
export const DELETE = 'note/delete';
export const CREATE_STAR = 'star/create';
export const DELETE_STAR = 'star/delete';

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

function createdStar(state: NoteState, action: Action<NotePayload>): NoteState {
  return {
    note: Object.assign({}, state.note, { starred: true })
  };
}

function removedStar(state: NoteState, action: Action<NotePayload>): NoteState {
  return {
    note: Object.assign({}, state.note, { starred: false })
  };
}

export default function reducer(state: NoteState = initState(), action: Action<*>): NoteState {
  switch (action.type) {
    case BEFORE_FETCH:
      return beforeFetchNote(state, action);
    case FETCH:
      return fetchedNote(state, action);
    case CREATE_STAR:
      return createdStar(state, action);
    case DELETE_STAR:
      return removedStar(state, action);
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

export async function remove(note: Note): Promise<Action<NotePayload>>{
  await webapi.deleteNote(note);
  return {
    type: DELETE,
    payload: {
      note
    }
  };
}

export async function createStar(note: Note): Promise<Action<NotePayload>> {
  await webapi.createStar(note);
  return {
    type: CREATE_STAR,
    payload: {
      note
    }
  };
}

export async function deleteStar(note: Note): Promise<Action<NotePayload>> {
  await webapi.deleteStar(note);
  return {
    type: DELETE_STAR,
    payload: {
      note
    }
  };
}
