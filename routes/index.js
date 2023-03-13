// required module
const express = require('express')
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");
// notes.js reference
const notesRouter = require('./notes');

const app = express(); 

app.use('/notes', notesRouter);

module.exports = app;