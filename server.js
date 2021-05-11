const express = require('express');
const data = require('./db/db.json');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));

// get data from db.
app.get('/api/notes', (req, res) => {
  res.json(data);
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