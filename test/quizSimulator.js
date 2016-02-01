'use strict';

const choice = require('../src/utils/choice');
const socket = require('socket.io-client')('http://localhost:5000');

for (let i = 0; i <= 900; i++) {
  let form = {
    house: choice(['acton', 'baxter', 'clive', 'darwin', 'houseman', 'webb']),
    year: choice([7, 8, 9, 10, 11])
  };

  socket.emit('JOIN_QUIZ', form);

  setInterval(() => {
    const packet = {
      house: form.house,
      year: form.year,
      answer: choice(['A', 'B', 'C', 'D']),
      peek: choice([true, false])
    };

    socket.emit('SELECT_ANSWER', packet);
    console.log(packet);
  }, Math.floor(Math.random() * 5000) + 3000);
}
