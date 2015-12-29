// import redis from 'redis';
import * as types from '../constants/actions';
import flattenQuiz from '../libs/flattenQuiz';
import calculateHousePoints from '../libs/housePoints';
import calculateAnswerStatistics from '../libs/answerStatistics';
import config from '../../config';

import axios from 'axios';
import moment from 'moment';
import quizIsReady from '../utils/quizIsReady';

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

    socket.on(types.BEGIN_QUIZ, () => {
      console.log('begun!');
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

  /**
   * Begins the countdown timer for questions.
   *
   * The system works on the basis that every
   * client is at the same point at any given
   * moment. Therefore, things must work
   * 'on-rails', and be fully automated.
   *
   * This function emits a socket ever second,
   * telling all clients the amount of time till
   * the question will move on, ensuring that the
   * same time is displayed on every screen, and
   * the question is changed at the precise moment.
   *
   * @param  {Number} questionLength The time between each question.
   * @return {Socket}                Whether to countdown, or change question.
   */
  function questionTimer(questionLength = 10000) {
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

  function searchForQuizzes() {
    axios.get(`http://localhost:${config.port}/api/quizzes`)
      .then(response => {
        for (let receivedQuiz of response.data.quizzes) {
          if (quizIsReady(receivedQuiz)) {
            const quiz = flattenQuiz(receivedQuiz);
            setQuiz(io, quiz);
            io.emit('new quiz', quiz);
            break;
          }
        }
      })
      .catch(err => console.log(err));
  }

  function setQuiz(quiz) {
    const wait = moment(quiz.settings.startDate).diff(moment());
    setTimeout(() => io.emit(types.BEGIN_QUIZ), wait);
  }
}

export default quizSockets;
