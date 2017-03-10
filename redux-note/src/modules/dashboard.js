/* @flow */
import type { Action, Note } from '../types';
import * as webapi from '../utils/webapi';
import { CREATE, UPDATE, DELETE } from './note';
import type { NotePayload } from './note';
import moment from 'moment';

export const FETCH = 'note/fetch/my';

export type DashboardState = {
  notes: Array<Note>
}

export type NotesPayload = {
  notes: Array<Note>
}

/**
 * Reducer
 */

export function initState(): DashboardState {
  return {
    notes: []
  };
}

function fetchNotes(state: DashboardState, action: Action<NotesPayload>): DashboardState {
  return Object.assign({}, state, {
    notes: action.payload.notes.map(n => {
      const { id, title, body, updated } = n;
      return {
        id, title, body,
        updated: moment(updated, moment.ISO_8601).toDate()
      };
    })
  });
}

function createNote(state: DashboardState, action: Action<NotePayload>): DashboardState {
  const { note } = action.payload;
  return Object.assign({}, state, {
    notes: [note, ...state.notes]
  });
}

function updateNote(state: DashboardState, action: Action<NotePayload>):DashboardState {
  const { note } = action.payload;
  return Object.assign({}, state, {
    notes: state.notes.map(n => {
      return note.id === n.id ? Object.assign({}, n, note) : n;
    })
  });
}

function removeNote(state: DashboardState, action: Action<NotePayload>):DashboardState {
  const { note } = action.payload;
  return Object.assign({}, state, {
    notes: state.notes.filter(n => {
      return note.id !== n.id;
    })
  });
}

export default function reducer(state: DashboardState = initState(), action: Action<any>): DashboardState {
  switch (action.type) {
    case FETCH:
      return fetchNotes(state, action);
    case CREATE:
      return createNote(state, action);
    case UPDATE:
      return updateNote(state, action);
    case DELETE:
      return removeNote(state, action);
    default:
      return state;
  }
}

/**
 * Action
 */

export async function fetchMyNotes(): Promise<Action<NotesPayload>> {
  const notes = await webapi.fetchMyNotes();
  return {
    type: FETCH,
    payload: {
      notes
    }
  };
}
