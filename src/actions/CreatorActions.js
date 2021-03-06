import axios from 'axios';
import * as types from 'constants/actions';
import { actions as notifActions } from 're-notif';

const socket = require('socket.io-client')(`http://localhost:5000`);

export function updateId(id) {
  return { type: types.UPDATE_ID, id };
}

export function updateTitle(title) {
  return { type: types.UPDATE_TITLE, title };
}

export function updateStartDate(startDate) {
  return { type: types.UPDATE_START_DATE, startDate };
}

export function updateStartTime(startTime) {
  return { type: types.UPDATE_START_TIME, startTime };
}

export function updateQuestionLength(questionLength) {
  return { type: types.UPDATE_QUESTION_LENGTH, questionLength };
}

export function updateBreakLength(breakLength) {
  return { type: types.UPDATE_BREAK_LENGTH, breakLength };
}

export function updateIsFinished(isFinished) {
  return { type: types.UPDATE_IS_FINISHED, isFinished };
}

export function updateAllSettings(settings) {
  return { type: types.UPDATE_ALL_SETTINGS, settings };
}

export function addCategory(body) {
  return { type: types.ADD_CATEGORY, body };
}

export function editCategory(id, body) {
  return { type: types.EDIT_CATEGORY, id, body };
}

export function deleteCategory(id) {
  return { type: types.DELETE_CATEGORY, id };
}

export function addQuestion(categoryId, body) {
  return { type: types.ADD_QUESTION, categoryId, body };
}

export function editQuestion(id, body) {
  return { type: types.EDIT_QUESTION, id, body };
}

export function deleteQuestion(id) {
  return { type: types.DELETE_QUESTION, id };
}

export function addAnswer(questionId, body, correct) {
  return { type: types.ADD_ANSWER, questionId, body, correct };
}

export function editAnswer(id, body, correct) {
  return { type: types.EDIT_ANSWER, id, body, correct };
}

export function deleteAnswer(id) {
  return { type: types.DELETE_ANSWER, id };
}

// Quiz saving async actions.
const { notifSend } = notifActions;
let dismissAfter = 2000;

/**
 * Updates a quiz that's already in the database.
 * @param  {Object} quiz Quiz to save.
 */
function updateQuiz(quiz) {
  return dispatch =>
    axios.put(`/api/quizzes/${quiz.id}`, quiz)
      .then(() => {
        console.log(quiz);
        socket.emit(types.UPLOAD_QUIZ, quiz);
      })
      .then(response => dispatch(notifSend({
        message: 'Quiz successfully updated!',
        kind: 'success',
        dismissAfter
      })))
      .catch(error => dispatch(notifSend({
        message: 'Quiz failed to update.',
        kind: 'danger',
        dismissAfter
      })));
}

/**
 * Saves a new quiz to the database.
 * @param  {Object} quiz Quiz to save.
 */
function saveQuiz(quiz) {
  return dispatch =>
    axios.post('/api/quizzes', quiz)
      .then(response => dispatch(updateId(response.data.quiz._id)))
      .then(response => socket.emit(types.UPLOAD_QUIZ, { ...quiz, _id: response.id }))
      .then(response => dispatch(notifSend({
        message: 'Quiz successfully saved!',
        kind: 'success',
        dismissAfter
      })))
      .catch(error => dispatch(notifSend({
        message: 'Quiz failed to save.',
        kind: 'danger',
        dismissAfter
      })));
}

/**
 * Checks if a new quiz should be created,
 * or an existing one updated.
 * @param  {Object} quiz The quiz to check.
 */
export function saveOrUpdateQuiz(quiz) {
  return dispatch => {
    if (quiz.id.length) {
      dispatch(updateQuiz(quiz));
    } else {
      dispatch(saveQuiz(quiz));
    }
  };
}
