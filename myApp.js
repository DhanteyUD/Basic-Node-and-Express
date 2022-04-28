const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

// 11. Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({ extended: false }));

// 4. Serve Static Assets
app.use('/public', express.static(__dirname + '/public'));

// 7. Implement a Root-Level Request Logger Middleware
app.use((req, res, next) => {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

// 8. Chain Middleware to Create a Time Server
app.get(
  '/now',
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

// 9. Get Route Parameter Input from the Client
app.get('/:word/echo', (req, res) => {
  const { word } = req.params;
  res.json({ echo: word });
});

// 10. Get Query Parameter Input from the Client
app.get('/name', (req, res) => {
  var firstName = req.query.first;
  var lastName = req.query.last;
  // OR you can destructure and rename the keys
  var { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({ name: `${firstName} ${lastName}` });
});

// 12. Get Data from POST Requests
app.post('/name', (req, res) => {
  // Handle the data in the request
  var string = req.body.first + ' ' + req.body.last;
  res.json({ name: string });
});

// 6. Use the .env File
app.get('/json', (req, res) => {
  process.env.MESSAGE_STYLE === 'uppercase'
    ? res.json({ message: 'HELLO JSON' })
    : res.json({ message: 'Hello json' });
});

// 5. Serve JSON on a Specific Route
app.get('/json', (req, res) => {
  res.json({ message: 'Hello json' });
});

// 3. Serve an HTML File
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// 2. Start a Working Express Server
app.get('/', function (req, res) {
  res.send('Hello Express');
});

module.exports = app;
