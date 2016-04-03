'use strict';

const choice = require('../src/utils/choice');
const socket = require('socket.io-client')('http://localhost:5000');

// for (let i = 0; i <= 100; i++) {
//   let form = {
//     house: choice(['acton', 'baxter', 'clive', 'darwin', 'houseman', 'webb']),
//     year: choice([7, 8, 9, 10, 11])
//   };

//   socket.emit('JOIN_QUIZ', form);

//   setInterval(() => {
//     const packet = {
//       house: form.house,
//       year: form.year,
//       answer: choice(['A', 'B', 'C', 'D']),
//       peek: choice([true, false])
//     };

//     socket.emit('SELECT_ANSWER', packet);
//     console.log(packet);
//   }, Math.floor(Math.random() * 5000) + 3000);
// }

let packets = [
  { house: 'acton',      year: 11,      answer: 'D',      peek: true },
  { house: 'houseman',   year: 7,       answer: 'C',      peek: true },
  { house: 'baxter',     year: 11,      answer: 'C',      peek: false },
  { house: 'webb',       year: 11,      answer: 'C',      peek: false },
  { house: 'acton',      year: 9,       answer: 'A',      peek: false },
  { house: 'houseman',   year: 10,      answer: 'A',      peek: true },
  { house: 'webb',       year: 7,       answer: 'B',      peek: false },
  { house: 'baxter',     year: 9,       answer: 'B',      peek: true },
  { house: 'clive',      year: 10,      answer: 'A',      peek: true },
  { house: 'darwin',     year: 7,       answer: 'C',      peek: false },
  { house: 'clive',      year: 10,      answer: 'C',      peek: false },
  { house: 'clive',      year: 7,       answer: 'B',      peek: true },
  { house: 'baxter',     year: 10,      answer: 'A',      peek: false },
  { house: 'darwin',     year: 11,      answer: 'A',      peek: false },
  { house: 'acton',      year: 11,      answer: 'C',      peek: true },
  { house: 'acton',      year: 8,       answer: 'C',      peek: false },
  { house: 'baxter',     year: 10,      answer: 'A',      peek: true },
  { house: 'webb',       year: 11,      answer: 'B',      peek: false },
  { house: 'acton',      year: 9,       answer: 'C',      peek: false },
  { house: 'webb',       year: 7,       answer: 'D',      peek: true },
  { house: 'darwin',     year: 7,       answer: 'B',      peek: false },
  { house: 'webb',       year: 10,      answer: 'C',      peek: false },
  { house: 'clive',      year: 8,       answer: 'C',      peek: true },
  { house: 'darwin',     year: 7,       answer: 'A',      peek: false },
  { house: 'acton',      year: 8,       answer: 'A',      peek: false },
  { house: 'webb',       year: 10,      answer: 'C',      peek: true },
  { house: 'webb',       year: 10,      answer: 'C',      peek: false },
  { house: 'houseman',   year: 10,      answer: 'D',      peek: true },
  { house: 'clive',      year: 7,       answer: 'A',      peek: true },
  { house: 'darwin',     year: 7,       answer: 'B',      peek: false },
  { house: 'baxter',     year: 7,       answer: 'B',      peek: false },
  { house: 'acton',      year: 9,       answer: 'C',      peek: false },
  { house: 'webb',       year: 9,       answer: 'C',      peek: true },
  { house: 'webb',       year: 8,       answer: 'B',      peek: false },
  { house: 'darwin',     year: 9,       answer: 'A',      peek: false },
  { house: 'baxter',     year: 8,       answer: 'B',      peek: false },
  { house: 'clive',      year: 7,       answer: 'B',      peek: false },
  { house: 'darwin',     year: 9,       answer: 'C',      peek: true },
  { house: 'baxter',     year: 7,       answer: 'A',      peek: false },
  { house: 'acton',      year: 9,       answer: 'D',      peek: true },
  { house: 'houseman',   year: 9,       answer: 'A',      peek: true },
  { house: 'webb',       year: 11,      answer: 'D',      peek: true },
  { house: 'clive',      year: 8,       answer: 'B',      peek: false },
  { house: 'baxter',     year: 10,      answer: 'C',      peek: false },
  { house: 'houseman',   year: 8,       answer: 'C',      peek: false },
  { house: 'clive',      year: 10,      answer: 'D',      peek: false },
  { house: 'darwin',     year: 7,       answer: 'B',      peek: true },
  { house: 'baxter',     year: 7,       answer: 'D',      peek: false },
  { house: 'webb',       year: 9,       answer: 'B',      peek: true },
  { house: 'houseman',   year: 8,       answer: 'B',      peek: true },
  { house: 'webb',       year: 9,       answer: 'A',      peek: false }
];

for (let packet of packets) {
  socket.emit('JOIN_QUIZ', { house: packet.house, year: packet.year });
  socket.emit('SELECT_ANSWER', packet);
}
