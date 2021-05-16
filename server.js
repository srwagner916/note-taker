const express = require('express');
const data = require('./db/db.json');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// get data from db.
app.get('/api/notes', (req, res) => {
  return res.json(data);
});

// Post route for new note
app.post('/api/notes', (req, res) => {

  const note = req.body;
  note.id = uuidv4();
  res.json(note);

  data.push(note);
  fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(data), (err, result) => {
    if (err) {
      console.log(err);
    }
    return;
  })
});

app.delete('/api/notes/:id', (req, res) => {
  const { id: id } = req.params;
  notes = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf8'))
  updatedNotesArr = notes.filter(note => note.id != id);
  console.log(updatedNotesArr);
});

// serve notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => console.log(`API server now on port ${PORT}!!`));