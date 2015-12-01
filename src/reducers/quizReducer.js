import { combineReducers } from 'redux';
import * as types from 'constants/actions';
import nextBiggest from 'utils/nextBiggest';
import isFinite from 'lodash/lang/isFinite';

// The default data that the quiz will show upon
// initialisation.
let defaultState = {
  settings: {
    id: '',
    title: 'Priory School Quiz',
    startTime: '',
    startDate: new Date(),
    questionLength: 10000,
    breakLength: 300000
  },
  categories: [
    { id: 0, body: 'Default' }
  ],
  questions: [
    { id: 0, categoryId: 0, body: 'I\'m the question title - tap to edit me!' }
  ],
  answers: [
    { id: 0, questionId: 0, body: 'I\'m the first possible answer!', correct: false },
    { id: 1, questionId: 0, body: 'You can edit any of us by tapping on our text.', correct: false},
    { id: 2, questionId: 0, body: 'See that bold check mark? It means I\'m the correct answer.', correct: true },
    { id: 3, questionId: 0, body: 'Tapping on another check mark will make that the correct answer.', correct: false }
  ]
};

function settings(state = defaultState.settings, action) {
  switch (action.type) {
    case types.UPDATE_ID:
      return { ...state, id: action.id };

    case types.UPDATE_TITLE:
      return { ...state, title: action.title };

    case types.UPDATE_START_DATE:
      return { ...state, startDate: action.startDate };

    case types.UPDATE_START_TIME:
      return { ...state, startTime: action.startTime };

    case types.UPDATE_QUESTION_LENGTH:
      return { ...state, questionLength: action.questionLength };

    case types.UPDATE_BREAK_LENGTH:
      return { ...state, breakLength: action.breakLength };

    case types.UPDATE_ALL_SETTINGS:
      return { ...state, ...action.settings };

    default:
      return state;
  }
}

function categories(state = defaultState.categories, action) {
  switch (action.type) {
    case types.ADD_CATEGORY:
      return [...state, {
        id: isFinite(nextBiggest(state)) ? nextBiggest(state) : 0,
        body: action.body
      }];

    case types.EDIT_CATEGORY:
      return state.map(category =>
        category.id === action.id ?
          { ...category, body: action.body } :
          category
      );

    case types.DELETE_CATEGORY:
      return state.filter(x => x.id !== action.id);

    case types.DELETE_ALL_CATEGORIES:
      return state.filter(x => x.id === -1);

    default:
      return state;
  }
}

function questions(state = defaultState.questions, action) {
  switch (action.type) {
    case types.ADD_QUESTION:
      return [...state, {
        body: action.body,
        id: isFinite(nextBiggest(state)) ? nextBiggest(state) : 0,
        categoryId: action.categoryId
      }];

    case types.EDIT_QUESTION:
      return state.map(question =>
        question.id === action.id ?
          { ...question, body: action.body } :
          question
      );

    case types.DELETE_QUESTION:
      return state.filter(x => x.id !== action.id);

    case types.DELETE_ALL_QUESTIONS:
      return state.filter(x => x.id === -1);

    default:
      return state;
  }
}

function answers(state = defaultState.answers, action) {
  switch (action.type) {
    case types.ADD_ANSWER:
      return [...state, {
        body: action.body,
        correct: action.correct,
        id: isFinite(nextBiggest(state)) ? nextBiggest(state) : 0,
        questionId: action.questionId
      }];

    case types.EDIT_ANSWER:
      return state.map(answer =>
        answer.id === action.id ?
          { ...answer, body: action.body, correct: action.correct } :
          answer
      );

    case types.DELETE_ANSWER:
      return state.filter(x => x.id !== action.id);

    case types.DELETE_ALL_ANSWERS:
      return state.filter(x => x.id === -1);

    default:
      return state;
  }
}

export default combineReducers({
  settings,
  categories,
  questions,
  answers
});
