const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
const randoNum = 0;
const history = [];

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here

// POST for receiving guesses

// GET results of guesses / also full history
app.get('/results', (req, res) => {
  res.send(history);
});

// generate my random number

// POST to restart with new random number

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
