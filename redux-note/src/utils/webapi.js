/* @flow */
import type { NotesResponse } from '../types';

export async function fetchNotes(): Promise<NotesResponse> {
  return {
    notes: [
      {
        id: 1,
        text: 'Hello World'
      },
      {
        id: 2,
        text: 'Foo'
      },
      {
        id: 3,
        text: 'Bar'
      }
    ]
  };
}
