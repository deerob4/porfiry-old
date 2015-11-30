import axios from 'axios';
import moment from 'moment';
import flattenQuiz from 'libs/flattenQuiz';
import * as types from 'constants/actions';
import colourScheme from 'utils/colourScheme';
import * as actions from 'actions/CreatorActions';

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
  return { type: types.CHANGE_YEAR, year };
}

export function receiveQuizzes(quizzes) {
  return { type: types.RECEIVE_QUIZZES, quizzes };
}

export function deleteQuiz(id) {
  return dispatch => {
    return axios.delete(`/api/quizzes/${id}`)
      .catch(error => console.log(error));
  };
}

function removeDefaultQuiz() {
  return dispatch => {
    dispatch({ type: types.DELETE_ALL_CATEGORIES });
    dispatch({ type: types.DELETE_ALL_QUESTIONS });
    dispatch({ type: types.DELETE_ALL_ANSWERS });
  };
}

export function loadQuiz(quiz) {
  quiz = flattenQuiz(quiz);
  console.log(quiz);
  return dispatch => {
    dispatch(removeDefaultQuiz());
    dispatch(actions.updateId(quiz.settings.id));
    dispatch(actions.updateTitle(quiz.settings.title));
    dispatch(actions.updateStartDate(quiz.settings.startDate));
    dispatch(actions.updateStartTime(quiz.settings.startTime));
    dispatch(actions.updateQuestionLength(quiz.settings.questionLength));
    dispatch(actions.updateBreakLength(quiz.settings.breakLength));
    quiz.categories.map(category => dispatch(actions.addCategory(category.body)));
    quiz.questions.map(question => dispatch(actions.addQuestion(question.categoryId, question.body)));
    quiz.answers.map(answer => dispatch(actions.addAnswer(answer.questionId, answer.body, answer.correct)));
  };
}

export function isQuizReady() {
  return dispatch => {
    return axios.get('/api/quizzes')
      .then(response => {
        for (let quiz of response.data.quizzes) {
          let minutesToStart = moment(quiz.startDate).diff(moment(), 'minutes');
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

export function fetchQuizzes() {
  return dispatch => {
    return axios.get('/api/quizzes')
      .then(response => dispatch(receiveQuizzes(response.data.quizzes)))
      .catch(error => console.log(error));
  };
}
