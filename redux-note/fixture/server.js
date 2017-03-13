#!/usr/bin/env node

const port = Number(process.env.PORT || '8181');

const express = require('express');
const bodyParser = require('body-parser');

class Notes {

  constructor() {
    this.data = new Map();
    this._idSeed = 1;
  }

  getAll() {
    const result = [];
    this.data.forEach((note, id) => {
      result.push(Object.assign({}, note, {
        id
      }));
    });
    return result;
  }

  get(id) {
    const note = this.data.get(id);
    if (!note) {
      throw new Error('Not Found');
    }
    return Object.assign({}, note, { id });
  }

  create(note) {
    const id = this._idSeed++;
    note.updated = new Date();
    this.data.set(id, note);
    return Object.assign({}, note, { id });
  }

  update(id, note) {
    const existNote = this.get(id);
    note.updated = new Date();
    this.data.set(id, note);
    return Object.assign({}, note, { id });
  }

  remove(id) {
    this.data.delete(id);
  }
}

class Stars {

  constructor(note) {
    this.data = new Set();
    this.note = note;
  }

  create(id) {
    this.data.add(id);
  }

  delete(id) {
    this.data.delete(id);
  }

  getAll() {
    const stars = [];
    this.data.forEach(id => {
      stars.push(this.note.get(id));
    });
    return stars;
  }

}

const notes = new Notes();
notes.create({ title: 'Test 1', body: 'test 1' });
notes.create({ title: 'Test 2', body: 'test 2' });
notes.create({ title: 'Test 3', body: 'test 3' });
const stars = new Stars(notes);
stars.create(1);


const app = express();
app.use(bodyParser());

app.get('/notes', (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.write(JSON.stringify({
    notes: notes.getAll()
  }));
  res.end();
});

app.post('/notes', (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const newNote = req.body;
  res.write(JSON.stringify(notes.create(newNote)));
  res.statusCode = 201;
  res.end();
});

app.get('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  try {
    res.write(JSON.stringify(notes.get(id)));
  } catch(e) {
    res.statusCode = 404;
  }
  res.end();
});

app.put('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = req.body;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  try {
    res.write(JSON.stringify(notes.update(id, note)));
  } catch(e) {
    res.statusCode = 400;
  }
  res.end();
});

app.delete('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  notes.remove(id);
  res.statusCode = 204;
  res.end();
});

app.get('/stars', (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.write(JSON.stringify({
    notes: stars.getAll()
  }));
  res.end();
});


app.listen(port);
