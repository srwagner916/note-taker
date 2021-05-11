const express = require('express');
const data = require('./db/db.json');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// get data from db.
app.get('/api/notes', (req, res) => {
  res.json(data);
});

// Post route for new note
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  req.body.id = data.length.toString();
  console.log(newNote);
  res.json(newNote);
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