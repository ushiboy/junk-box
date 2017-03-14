/* @flow */
import type { Action, Note } from '../types';
import * as webapi from '../utils/webapi';
import moment from 'moment';

export type StarredState = {
  notes: Array<Note>
}

export type NotesPayload = {
  notes: Array<Note>
}

export const FETCH_STARRED = 'note/fetch/starred';

/**
 * Reducer
 */

export function initState(): StarredState {
  return {
    notes: []
  }
}

function fetchedStarred(state: StarredState, action: Action<NotesPayload>): StarredState {
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

export default function reducer(state: StarredState = initState(), action: Action<*>): StarredState {
  switch (action.type) {
    case FETCH_STARRED:
      return fetchedStarred(state, action);
  }
  return state
}

/**
 * Action
 */

export async function fetchStarred(): Promise<Action<NotesPayload>> {
  const notes = await webapi.fetchStarredNotes();
  return {
    type: FETCH_STARRED,
    payload: {
      notes
    }
  };
}
