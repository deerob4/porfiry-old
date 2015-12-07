import axios from 'axios';
import * as types from 'constants/actions';

const socket = require('socket.io-client')('http://localhost:5000');

export function joinQuiz({ house, year }) {
  return dispatch =>
    socket.emit(types.JOIN_QUIZ, { house, year });
}

export function addPlayer(players) {
  return { type: types.ADD_PLAYER, players };
}

export function removePlayer(socketId) {
  return { type: types.REMOVE_PLAYER, socketId };
}

export function selectAnswer({ house, year }, answer) {
  return dispatch =>
    socket.emit(types.SELECT_ANSWER, { house, year, answer });
}
