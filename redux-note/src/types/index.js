/* @flow */

export type Action<T> = {
  type: string,
  payload: T
}

export type Note = {
  id: number,
  text: string
}

export type NotesResponse = {
  notes: Array<Note>
}
