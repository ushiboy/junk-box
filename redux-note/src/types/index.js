/* @flow */

export type Action<T> = {
  type: string,
  payload: T
}

export type NewNote = {
  title: string,
  body: string
}

export type Note = {
  id: number,
  title: string,
  body: string
}
