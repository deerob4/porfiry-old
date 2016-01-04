import axios from 'axios';
import flattenQuiz from 'libs/flattenQuiz';
import * as types from 'constants/actions';
import colourScheme from 'utils/colourScheme';
import isQuizReady from 'utils/isQuizReady';
import * as actions from 'actions/CreatorActions';
import { actions as notifActions } from 're-notif';

const socket = require('socket.io-client')('http://localhost:5000');

const { notifSend } = notifActions;
let dismissAfter = 2000;

/**
 * Change the colour scheme of the quiz.
 * @param  {String} house The user's house.
 * @return {Object}       Action dispatcher with colour.
 */
function changeColours(house) {
  const colourMap = {
    acton: 'blue',
    baxter: 'orange',
    clive: 'green',
    darwin: 'purple',
    houseman: 'red',
    webb: 'yellow'
  };

  return { type: types.CHANGE_COLOURS, colours: colourScheme(colourMap[house]) };
}

/**
 * Updates the user's house and calls new colours.
 * @param  {String} house The new house.
 * @return {Object}       Action dispatcher with house.
 */
export function changeHouse(house) {
  return dispatch => {
    dispatch(changeColours(house));
    dispatch({ type: types.CHANGE_HOUSE, house });
  };
}

/**
 * Update the user's year.
 * @param  {String} year The new year.
 * @return {Object}      Action dispathcer with year.
 */
export function changeYear(year) {
  return { type: types.CHANGE_YEAR, year: parseInt(year) };
}

/**
 * Sends a DELETE request to /api/quizzes at the
 * current quiz, deleting it from the database.
 * @param  {Number} id ID of quiz to delete.
 * @return {Function}    Call success or delete.
 */
export function deleteQuiz(id) {
  return dispatch => {
    dispatch({ type: types.DELETE_QUIZ });
    return axios.delete(`/api/quizzes/${id}`)
      .then(() => dispatch(deleteQuizSuccess(id)))
      .catch(() => dispatch(deleteQuizFailure()));
  };
}

/**
 * Shows success message if quiz deleted successfully.
 * @param  {Number} id ID of deleted quiz.
 * @return {Object}    Action dispatcher with year.
 */
function deleteQuizSuccess(id) {
  return dispatch => {
    dispatch(notifSend({
      message: 'Quiz succesfully deleted.',
      kind: 'success',
      dismissAfter
    }));
    dispatch({ type: types.DELETE_QUIZ_SUCCESS, id });
  };
}

/**
 * Shows error message if quiz failed to delete.
 */
function deleteQuizFailure() {
  return dispatch =>
    dispatch(notifSend({
      message: 'Quiz failed to delete.',
      kind: 'danger',
      dismissAfter
    }));
}

/**
 * Removes all categories, questions and
 * answers from the current quiz.
 * @return {Object} Appropriate action dispatchers.
 */
function removeCurrentQuiz() {
  return dispatch => {
    dispatch({ type: types.DELETE_ALL_CATEGORIES });
    dispatch({ type: types.DELETE_ALL_QUESTIONS });
    dispatch({ type: types.DELETE_ALL_ANSWERS });
  };
}


/**
 * Checks if a quiz is ready.
 *
 * 1. Fetch an array of the quizzes.
 * 2. Begin a loop through the array.
 * 3. If the quiz is due to start within 35 minutes, load it.
 *
 * @return {Object} Action dispatcher to loadQuiz()
 */
export function checkIfQuizReady() {
  return dispatch => {
    socket.emit(types.CHECK_IF_QUIZ_READY);
    socket.on(types.QUIZ_IN_PROGRESS, () => {
      // dispatch(loadQuiz(quiz));
      // dispatch({ type: types.QUIZ_IS_READY });
    });
  };
}

/**
 * Loads a quiz into the store.
 *
 * Quizzes returned from the server have to be
 * normalised into a form that can be loaded
 * into the Redux store.
 *
 * 1. Loop through all the settings and add them to store.
 * 2.
 *
 * @param  {Object}  quiz      The quiz to load.
 * @param  {Boolean} normalise Whether the quiz should be normalised.
 * @return {Object}            Action dispatchers to load the quiz.
 */
export function loadQuiz(quiz, normalise = true ) {
  if (normalise) {
    quiz = flattenQuiz(quiz);
  }

  return dispatch => {
    // Remove the current quiz.
    dispatch(removeCurrentQuiz());
    // Load the quiz's settings.
    dispatch(actions.updateAllSettings(quiz.settings));
    // Map through every category and add them to the quiz.
    quiz.categories.map(category => dispatch(actions.addCategory(category.body)));
    // Map through ever question and add them to the quiz.
    quiz.questions.map(question => dispatch(actions.addQuestion(
      question.categoryId,
      question.body
    )));
    // Map through ever answer and add them to the quiz.
    quiz.answers.map(answer => dispatch(actions.addAnswer(
      answer.questionId,
      answer.body,
      answer.correct
    )));
  };
}

/**
 * Request the saved quizzes.
 *
 * If they are received, call receiveQuizzes.
 * Otherwise call requestQuizzesFailure().
 */
export function requestQuizzes() {
  return dispatch => {
    dispatch({ type: types.REQUEST_QUIZZES });
    return axios.get('/api/quizzes')
      .then(response => dispatch(receiveQuizzes(response.data.quizzes)))
      .catch(error => dispatch(requestQuizzesFailure()));
  };
}

/**
 * Dispatch request failure action.
 */
function requestQuizzesFailure() {
  return { type: types.REQUEST_QUIZZES_FAILURE };
}

/**
 * Dispatch request success action.
 */
function receiveQuizzes(quizzes) {
  return { type: types.RECEIVE_QUIZZES, quizzes };
}
