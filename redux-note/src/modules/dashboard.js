/* @flow */
import type { Action, Note } from '../types';
import * as webapi from '../utils/webapi';

export const FETCH = 'note/fetch/my';

export type DashboardState = {
  notes: Array<Note>
}

export type FetchPayload = {
  notes: Array<Note>
}

export function initState(): DashboardState {
  return {
    notes: []
  };
}

function fetchNotes(state: DashboardState, action: Action<FetchPayload>): DashboardState {
  return Object.assign({}, state, {
    notes: action.payload.notes
  });
}

export default function reducer(state: DashboardState = initState(), action: Action<*>): DashboardState {
  switch (action.type) {
    case FETCH:
      return fetchNotes(state, action);
    default:
      return state;
  }
}

export async function fetchMyNotes(): Promise<Action<FetchPayload>> {
  const payload = await webapi.fetchNotes();
  return {
    type: FETCH,
    payload
  };
}
