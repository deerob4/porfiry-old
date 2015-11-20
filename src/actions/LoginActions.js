import * as types from 'constants/actions';
import axios from 'axios';

export function changeHouse(house) {
  return { type: types.CHANGE_HOUSE, house };
}

export function changeYear(year) {
  return { type: types.CHANGE_YEAR, year };
}

export function receiveQuizzes(quizzes) {
  return { type: types.RECEIVE_QUIZZES, quizzes };
}

export function deleteQuiz(id) {
  return dispatch => {
    return axios.delete(`/api/quizzes/${id}`)
      .then(response => console.log(response))
      .then(() => ({ types: 'DELETE_QUIZ', id }))
      .catch(error => console.log(error));
  };
}

export function fetchQuizzes() {
  return dispatch => {
    return axios.get('/api/quizzes')
      .then(response => dispatch(receiveQuizzes(response.data.quizzes)))
      .catch(error => console.log(error));
  };
}
