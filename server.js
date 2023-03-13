// required modules
const express = require('express');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("./helpers/fsUtils");

const path = require('path');

const api = require('./routes/index.js');

const PORT = process.env.port || 3001;

const app = express();

// middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

app.use(express.static('public'));

// get route for index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// get route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// wildcard route for bad page
app.get('*', (req, res) =>
  res.status(404).send('page could not be found')
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
