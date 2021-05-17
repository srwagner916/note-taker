//// Dependencies
///
const router = require('express').Router();
const data = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// get data from db.
router.get('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '../db/db.json'), (err, result) => {
    if (err){
      console.log(err);
    }
    let data = JSON.parse(result);
    res.json(data);
  })
});

// Post route for new note
router.post('/notes', (req, res) => {
  // read db.json and set it to a variable
  notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
  
  // note variable = new note body
  const note = req.body;
  // set's a unique id to note
  note.id = uuidv4();
  res.json(note);
  // push the new note to db
  notes.push(note);
  // write the new note to db.json
  fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err, result) => {
    if (err) {
      console.log(err);
    }
    return;
  })
});

// delote note route
router.delete('/notes/:id', (req, res) => {
  // set the specified id to a variable
  const { id: id } = req.params;
  // read db.json and set it to a variable
  notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
  // filter notes array to keep only notes with id's that don't match the specified id
  updatedNotesArr = notes.filter(note => note.id != id);
  res.json(updatedNotesArr);
  // write the updated notes to db.json
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(updatedNotesArr), (err, result) => {
    if (err) {
      console.log(err);
    }
    return;
  });
});

module.exports = router;