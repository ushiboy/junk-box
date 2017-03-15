/* @flow */
import type { Note } from '../types';

export async function fetchMyNotes(): Promise<Array<Note>> {
  return fetch('/api/notes')
    .then(res => res.json())
    .then(json => json.notes);
}

export async function fetchNote(id: number): Promise<Note> {
  return fetch(`/api/notes/${id}`)
    .then(res => res.json());
}

export async function createNote(): Promise<Note> {
  return fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      title: 'Untitled',
      body: ''
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(`Bad Response. [${res.status}]`);
      }
    });
}

export async function updateNote(note: Note): Promise<Note> {
  const { id, title, body } = note;
  return fetch(`/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      title,
      body
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(`Bad Response. [${res.status}]`);
      }
    });
}

export async function deleteNote(note: Note): Promise<> {
  const { id } = note;
  return fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Bad Response. [${res.status}]`);
      }
    });
}

export async function fetchStarredNotes(): Promise<Array<Note>> {
  return fetch('/api/stars')
    .then(res => res.json())
    .then(json => json.notes);
}

export async function createStar(note: Note): Promise<> {
  const { id } = note;
  return fetch(`/api/notes/${id}/star`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Bad Response. [${res.status}]`);
      }
    });
}

export async function deleteStar(note: Note): Promise<> {
  const { id } = note;
  return fetch(`/api/notes/${id}/star`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Bad Response. [${res.status}]`);
      }
    });
}

