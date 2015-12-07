import axios from 'axios';
import moment from 'moment';
import flattenQuiz from 'libs/flattenQuiz';
import * as types from 'constants/actions';
import colourScheme from 'utils/colourScheme';
import * as actions from 'actions/CreatorActions';
import { actions as notifActions } from 're-notif';

const { notifSend } = notifActions;
let dismissAfter = 2000;

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

export function changeHouse(house) {
  return dispatch => {
    dispatch(changeColours(house));
    dispatch({ type: types.CHANGE_HOUSE, house });
  };
}

export function changeYear(year) {
  return { type: types.CHANGE_YEAR, year: parseInt(year) };
}


export function deleteQuiz(id) {
  return dispatch => {
    dispatch({ type: types.DELETE_QUIZ });
    return axios.delete(`/api/quizzes/${id}`)
      .then(() => dispatch(deleteQuizSuccess(id)))
      .catch(() => dispatch(deleteQuizFailure()));
  };
}

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

function deleteQuizFailure() {
  return dispatch =>
    dispatch(notifSend({
      message: 'Quiz failed to delete.',
      kind: 'danger',
      dismissAfter
    }));
}

function removeCurrentQuiz() {
  return dispatch => {
    dispatch({ type: types.DELETE_ALL_CATEGORIES });
    dispatch({ type: types.DELETE_ALL_QUESTIONS });
    dispatch({ type: types.DELETE_ALL_ANSWERS });
  };
}

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

export function isQuizReady() {
  return dispatch => {
    return axios.get('/api/quizzes')
      .then(response => {
        for (let quiz of response.data.quizzes) {
          let minutesToStart = moment(quiz.startDate).diff(moment(), 'minutes');
          console.log(minutesToStart);
          if (minutesToStart >= -5 && minutesToStart < 30) {
            dispatch(loadQuiz(quiz));
            dispatch({ type: types.QUIZ_IS_READY });
            break;
          }
        }
      })
      .catch(error => console.log(error));
  };
}

export function requestQuizzes() {
  return dispatch => {
    dispatch({ type: types.REQUEST_QUIZZES });
    return axios.get('/api/quizzes')
      .then(response => dispatch(receiveQuizzes(response.data.quizzes)))
      .catch(error => dispatch(requestQuizzesFailure()));
  };
}

function requestQuizzesFailure() {
  return { type: types.REQUEST_QUIZZES_FAILURE };
}

function receiveQuizzes(quizzes) {
  return { type: types.RECEIVE_QUIZZES, quizzes };
}
