$(document).ready(handleReady);

function handleReady() {
  console.log('jquery is loaded!');
  // listening for submit click
  $('.js-btn-submit').on('click', clickHandlerSubmit);
  $('.js-btn-restart').on('click', clickHandlerRestart);

  getHistory();
}

function clickHandlerRestart() {
  postRestart();
}

function clickHandlerSubmit() {
  // console.log('SUBMIT');
  const guesses = [
    {
      name: 'Player 1',
      guess: $('.js-input-player1').val(),
    },
    {
      name: 'Player 2',
      guess: $('.js-input-player2').val(),
    },
    {
      name: 'Player 3',
      guess: $('.js-input-player3').val(),
    },
  ];

  postGuesses(guesses);
}

function render(resultHistory) {
  console.log(resultHistory);
  const $results = $('.js-results');

  $results.empty();
  for (let i = 0; i < resultHistory.length; i++) {
    const round = resultHistory[i];

    $results.append(`<li>Round ${i + 1}</li>`);
    for (let playerResults of round) {
      $results.append(
        `<li>${playerResults.name}, guessed ${playerResults.guess} <span>${playerResults.result}</span></li>`
      );
    }
  }
}

// API / SERVER CALLS

function postGuesses(playerGuesses) {
  // console.log('sending: ', playerGuesses);
  $.ajax({
    type: 'POST',
    url: '/guesses',
    data: { guesses: playerGuesses },
  })
    .then(function (response) {
      // console.log('POST of guesses:', response);
      // GET -> results
      getHistory();
    })
    .catch(function (err) {
      console.log(err);
      alert('IT BROKE');
    });
}

function getHistory() {
  $.ajax({
    type: 'GET',
    url: '/results',
  })
    .then(function (response) {
      render(response);
    })
    .catch(function (err) {
      console.log(err);
      alert('IT BROKE');
    });
}

function postRestart() {
  // console.log('sending: ', playerGuesses);
  $.ajax({
    type: 'POST',
    url: '/restart',
  })
    .then(function (response) {
      // console.log('POST of guesses:', response);
      // GET -> results
      getHistory();
    })
    .catch(function (err) {
      console.log(err);
      alert('IT BROKE');
    });
}
