import axios from 'axios';
import * as types from 'constants/actions';
import { quizIsReady } from 'actions/LoginActions';

const socket = require('socket.io-client')(`http://localhost:5000`);

export function joinQuiz({ house, year }) {
  return dispatch =>
    socket.emit(types.JOIN_QUIZ, { house, year });
}

export function beginQuiz() {
  return { type: types.BEGIN_QUIZ };
}

export function leaveQuiz(historyProp) {
  return dispatch => {
    historyProp.pushState('/');
    dispatch({ type: types.LEAVE_QUIZ });
    dispatch(quizIsReady(false));
  };
}

export function addPlayer(players) {
  return { type: types.ADD_PLAYER, players };
}

export function removePlayer(socketId) {
  return { type: types.REMOVE_PLAYER, socketId };
}

export function decrementTimeLeft(timeLeft) {
  return { type: types.DECREMENT_TIME_LEFT, timeLeft };
}

export function showNextQuestion(questionId) {
  return { type: types.SHOW_NEXT_QUESTION, questionId };
}

export function selectAnswer(packet) {
  return dispatch =>
    socket.emit(types.SELECT_ANSWER, packet);
}

export function receiveAnswer(answer) {
  return { type: types.RECEIVE_ANSWER, answer };
}
