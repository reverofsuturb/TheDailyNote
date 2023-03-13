// required modules
const notes = require("express").Router();
const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

// pulls the data from db.json and shows it on /notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// saves the title and text of a new post and assigns each a random id, used uuid and helper utilty here

notes.post("/", (req, res) => {
  console.info(`${req.method} request received`);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`New Note added`);
  } else {
    res.error("Error, note not added");
  }
});

notes.delete('/:id', (req, res) => {
  console.info(`${req.method} request received`);
  // reading the file then creating a json object from the data
  readFromFile("./db/db.json").then((data) => {
  let noteArray = JSON.parse(data);
  // filtering out everything that is not the id given to make a new array
  let newArray = noteArray.filter(item => item.id !== req.params.id);
  // rewriting the array 
  writeToFile('./db/db.json', newArray);
  // sending json response
  res.json(newArray);
  
  })
});

module.exports = notes;
