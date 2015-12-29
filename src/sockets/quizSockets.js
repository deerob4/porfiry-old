// import redis from 'redis';
import * as types from '../constants/actions';

import questionTimer from './questionTimer';
import searchForQuizzes from './searchForQuizzes';
import calculateHousePoints from '../libs/housePoints';
import calculateAnswerStatistics from '../libs/answerStatistics';

// Look into getting the keys to expire at the end of each quiz.

function quizSockets(server) {
  const io = require('socket.io').listen(server);

  let started = false;

  let quiz;
  let players = [];
  let answers = {};
  let housePoints = {};

  searchForQuizzes(io);

  io.on('connection', (socket) => {
    // If they upload a new quiz, ensure the server finds
    // and schedules it automatically.
    socket.on(types.UPLOAD_QUIZ, () => searchForQuizzes(io));
    socket.on('new quiz', (receivedQuiz) => quiz = receivedQuiz);

    // Add the player to the array of connections.
    socket.on(types.JOIN_QUIZ, (form) => {
      players.push({ socket, form });

      io.emit(types.ADD_PLAYER, players.map(player => ({
        ...player.form,
        socketId: player.socket.id
      })));

      // if (players.length >= 2) {
      //   questionTimer(io);
      // }
    });

    socket.on(types.SELECT_ANSWER, (packet) => {
      const houses = ['acton', 'baxter', 'clive', 'darwin', 'houseman', 'webb'];

      // Calculate the answer for each house.
      answers[packet.questionId] = calculateAnswerStatistics({
        packet,
        keys: houses,
        prop: 'house'
      }, answers[packet.questionId]);

      // Calculate the current house points.
      housePoints = calculateHousePoints({
        packet,
        correct: 'A',
        keys: houses,
        prop: 'house'
      }, housePoints);

      io.emit(types.RECEIVE_ANSWER, { house: packet.house, answer: packet.answer });
    });

    socket.on('disconnect', () => {
      // Remove the player from the array of connections.
      players = players.filter(player => player.socket.id !== socket.id);
      io.emit(types.REMOVE_PLAYER, socket.id );
    });
  });
}

export default quizSockets;
