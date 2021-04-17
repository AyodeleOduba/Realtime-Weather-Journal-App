// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run the server and routes
const express = require('express');

// Dependencies
const bodyParser = require('body-parser');

// Start up an instance of the app
const app = express();

/* Middleware */
//Here we are configuring express to use body-parser as middle-ware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Post route for the date, temperature and user's feeling data
const data = [];
app.post('/add', addInformation);

function addInformation(req, res) {
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['content'] = req.body.content;
  res.send(projectData);
}

// Callback function to complete GET '/all' for all data from the server
app.get('/all', getInformation);

function getInformation(req, res) {
  res.send(projectData);
}

// Setup the Server

const port = 8000;
const server = app.listen(port, listening);

function listening() {
  console.log('server running');
  console.log(`running on localhost: ${port}`);
};
