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

function receiveHousePoints(housePoints) {
  return { type: types.RECEIVE_HOUSE_POINTS, housePoints };
}

export function showResults(historyProp, housePoints) {
  return dispatch => {
    historyProp.pushState('results', '/results');
    dispatch(receiveHousePoints(housePoints));
    dispatch({ type: types.SHOW_RESULTS });
  };
}

export function leaveQuiz(historyProp) {
  return dispatch => {
    historyProp.pushState('/');
    dispatch({ type: types.LEAVE_QUIZ });
    dispatch(quizIsReady(false));
  };
}

export function decrementTimeLeft(timeLeft) {
  return { type: types.DECREMENT_TIME_LEFT, timeLeft };
}

export function showNextQuestion(questionId) {
  return { type: types.SHOW_NEXT_QUESTION, questionId };
}

export function moveToCategory(categoryId) {
  return { type: types.MOVE_TO_CATEGORY, categoryId };
}

export function selectAnswer(packet) {
  return dispatch => {
    dispatch({ type: types.SELECT_ANSWER, answer: packet.answer });
    socket.emit(types.SELECT_ANSWER, packet);
  };
}

export function receiveAnswer(answer) {
  return { type: types.RECEIVE_ANSWER, answer };
}
