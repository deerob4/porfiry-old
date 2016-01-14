import * as types from '../constants/actions';
import axios from 'axios';
import moment from 'moment';
import config from '../config';
import schedule from 'node-schedule';
import flattenQuiz from '../libs/flattenQuiz';
import isQuizReady from '../utils/isQuizReady';
import calculateHousePoints from '../libs/housePoints';
import calculateAnswerStatistics from '../libs/answerStatistics';

async function quizSockets(server) {
  let io = require('socket.io').listen(server);
  let quizAddress = `http://localhost:${config.port}/api/quizzes`;

  // Get initial set of quizzes on server start and schedule them.
  (await axios.get(quizAddress)).data.quizzes
              .map(x => flattenQuiz(x))
              .forEach(quiz => scheduleQuiz(quiz));

  let currentQuiz = {};
  let jobs = {};
  let quizStatus = types.NO_QUIZ_READY;
  let players = [];
  let answers = {};
  let housePoints = {};

  io.on('connection', (socket) => {
    // If they upload a new quiz, ensure the server finds
    // and schedules it automatically.
    socket.on(types.UPLOAD_QUIZ, (quiz) => {
      console.log(quiz);
      quiz = flattenQuiz(quiz);
      scheduleQuiz(quiz);
    });

    socket.on(types.DELETE_QUIZ, (id) => {
      // Cancel all the jobs related to that quiz.
      jobs[id].forEach(job => job.cancel());
      // Delete the quiz entry.
      delete jobs[id];
      quizStatus = types.NO_QUIZ_READY;
    });

    // Inform the client about the current status of the quiz.
    socket.on(types.CHECK_IF_QUIZ_READY, () => {
      socket.emit(quizStatus, currentQuiz);
      console.log(quizStatus);
    });

    // Add the player to the array of connections.
    socket.on(types.JOIN_QUIZ, (form) => {
      players.push({ socket, form });

      io.emit(types.ADD_PLAYER, players.map(player => ({
        ...player.form,
        socketId: player.socket.id
      })));
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

  function scheduleQuiz(quiz) {
    const quizStart = new Date(quiz.settings.startDate);

    if (moment(quizStart).isAfter(moment())) {
      let countdownStart = moment(quizStart).subtract(20, 'minutes')._d;
      let totalQuizDuration = quiz.questions.length * quiz.settings.questionLength + 5000;
      let quizFinish = moment(quizStart).add(totalQuizDuration, 'milliseconds')._d;

      jobs[quiz.settings.id] = [
        schedule.scheduleJob(countdownStart, () => {
          currentQuiz = quiz;
          quizStatus = types.QUIZ_IS_SCHEDULED;
        }),

        schedule.scheduleJob(quizStart, () => {
          quizStatus = types.QUIZ_IN_PROGRESS;
          io.emit(types.BEGIN_QUIZ);
        }),

        schedule.scheduleJob(quizFinish, () => {
          quizStatus = types.NO_QUIZ_READY;
          io.emit(types.LEAVE_QUIZ);
        })
      ];

      console.log(jobs);

      questionTimer(quiz);
    }
  }

  function questionTimer(quiz) {
    const questionLength = quiz.settings.questionLength;
    const quizStart = new Date(quiz.settings.startDate);

    quiz.questions.forEach((question, i) => {
      const changeQuestion = moment(quizStart).add(questionLength * i, 'milliseconds')._d;

      jobs[quiz.settings.id].push(
        schedule.scheduleJob(changeQuestion, () => {
          io.emit(types.SHOW_NEXT_QUESTION, i);
          countdown();
        })
      );
    });
  }

  function countdown() {
    setInterval(() => io.emit(types.DECREMENT_TIME_LEFT), 1000);
  }
}

export default quizSockets;
