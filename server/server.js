const express = require('express');
const bodyParser = require('body-parser');
const randomNumber = require('./modules/randomNumber');

const app = express();
const PORT = 5000;
let randoNum = randomNumber(1, 25);
let history = [];
console.log(randoNum);

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here

// POST for receiving guesses
app.post('/guesses', (req, res) => {
  // guess data
  // {
  //   guesses: [
  //     {
  //       name:'',
  //       guess: '',
  //     }
  //   ]
  // }
  const guessData = req.body.guesses;
  console.log('guessData: ', guessData);
  const results = []; // round of guesses

  // Check against random number
  // loop through players
  for (let i = 0; i < guessData.length; i++) {
    const playerData = guessData[i];

    if (playerData.guess > randoNum) {
      playerData.result = 'too high';
    } else if (playerData.guess < randoNum) {
      playerData.result = 'too low';
    } else {
      playerData.result = 'correct';
    }

    results.push(playerData);
  }

  history.push(results);

  res.sendStatus(201);
});

// GET results of guesses / also full history
app.get('/results', (req, res) => {
  res.send(history);
});

// POST to restart with new random number
app.post('/restart', (req, res) => {
  randoNum = randomNumber(1, 25);
  console.log(randoNum);
  history = [];
  console.log(history);

  res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

// GET = client ------> server (request) ----> client (response) sending data back
// POST = client ------> server (request) [ I will make that thing ] ----> client (response) OK
