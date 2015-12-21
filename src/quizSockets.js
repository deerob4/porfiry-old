// import redis from 'redis';
import * as types from './constants/actions';
import answerStatistics from './libs/answerStatistics';

// Look into getting the keys to expire at the end of each quiz.

function quizSockets(server) {
  const io = require('socket.io').listen(server);
  // const client  = redis.createClient();
  let players = [];
  let answers = {};
  // client.on('err', (err) => consol⁄e.log(err));

  io.on('connection', (socket) => {
    // Add the player to the array of connections.
    socket.on(types.JOIN_QUIZ, (form) => {
      players.push({ socket, form });

      io.emit(types.ADD_PLAYER, players.map(player => ({
        ...player.form,
        socketId: player.socket.id
      })));

      if (players.length >= 2) {
        questionTimer(io);
      }
    });

    socket.on(types.SELECT_ANSWER, (packet) => {
      const houses = ['acton', 'baxter', 'clive', 'darwin', 'houseman', 'webb'];
      answers[packet.questionId] = answerStatistics(packet, houses, 'house', answers[packet.questionId]);
      io.emit(types.UPDATE_ANSWER_STATISTICS, answers);
      console.log(answers);
    });

    socket.on('disconnect', () => {
      // Remove the player from the array of connections.
      players = players.filter(player => player.socket.id !== socket.id);
      io.emit(types.REMOVE_PLAYER, socket.id );
    });
  });
}

function questionTimer(io, questionLength = 10000) {
  let timeLeft = questionLength;

  setInterval(() => {
    if (timeLeft) {
      timeLeft -= 1000;
      io.emit(types.DECREMENT_TIME_LEFT, timeLeft);
    } else {
      timeLeft = questionLength;
      io.emit(types.SHOW_NEXT_QUESTION);
    }
  }, 1000);
}

export default quizSockets;
