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
    this.data.set(id, note);
    return Object.assign({}, note, { id });
  }

  update(id, note) {
    const existNote = this.get(id);
    this.data.set(id, note);
    return Object.assign({}, note, { id });
  }

  remove(id) {
    this.data.delete(id);
  }
}

const notes = new Notes();
notes.create({ title: 'Test 1', text: 'test 1' });
notes.create({ title: 'Test 2', text: 'test 2' });
notes.create({ title: 'Test 3', text: 'test 3' });

const app = express();
app.use(bodyParser());

app.get('/notes', (req, res) => {
  res.setHeader('Content-Type', 'application/json charset=utf-8');
  res.write(JSON.stringify({
    notes: notes.getAll()
  }));
  res.end();
});

app.post('/notes', (req, res) => {
  res.setHeader('Content-Type', 'application/json charset=utf-8');
  const newNote = req.body;
  res.write(JSON.stringify(notes.create(newNote)));
  res.statusCode = 201;
  res.end();
});

app.get('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  res.setHeader('Content-Type', 'application/json charset=utf-8');
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
  res.setHeader('Content-Type', 'application/json charset=utf-8');
  try {
    res.write(JSON.stringify(notes.update(id, note)));
  } catch(e) {
    res.statusCode = 400;
  }
  res.end();
});

app.delete('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  res.setHeader('Content-Type', 'application/json charset=utf-8');
  notes.remove(id);
  res.statusCode = 204;
  res.end();
});

app.listen(port);
