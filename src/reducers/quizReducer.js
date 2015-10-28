import * as types from 'constants/MakerActions';
import nextBiggest from 'utils/nextBiggest';
import { combineReducers } from 'redux';

// The default data that the quiz will show upon
// initialisation.
const defaultState = {
  metadata: {
    title: 'Priory School Quiz',
    startTime: new Date(),
    questionIntervals: 10000,
    realtimeGraphics: true,
    intervalLength: 300000
  },
  categories: [
    { id: 0, body: 'Tutorial' },
    { id: 1, body: 'Children\'s books' }
  ],
  questions: [
    { id: 0, categoryId: 0, body: 'I\'m the question title - tap to edit me!' },
    { id: 1, categoryId: 1, body: 'Where\'s Wallie?' }
  ],
  answers: [
    { id: 0, questionId: 0, body: 'I\'m the first possible answer!', correct: false },
    { id: 1, questionId: 0, body: 'You can edit any of us by tapping our text.', correct: false},
    { id: 2, questionId: 0, body: 'See that light? It means I\'m the right answer.', correct: true },
    { id: 3, questionId: 0, body: 'It\'s no fun being fourth!', correct: false },

    { id: 4, questionId: 1, body: '1940', correct: false },
    { id: 5, questionId: 1, body: '1939', correct: false},
    { id: 6, questionId: 1, body: '1811', correct: true },
    { id: 7, questionId: 1, body: '1943', correct: false }
  ]
};

function metadata(state = defaultState.metadata, action) {
  switch (action.type) {
    case types.UPDATE_TITLE:
      return action.title;

    case types.UPDATE_START_TIME:
      return action.startTime;

    case types.UPDATE_QUESTION_INTERVALS:
      return action.questionIntervals;

    case types.UPDATE_REALTIME_GRAPHICS:
      return action.realtimeGraphics;

    case types.UPDATE_INTERVAL_LENGTH:
      return action.intervalLength;

    default:
      return state;
  }
}

function categories(state = defaultState.categories, action) {
  switch (action.type) {
    case types.ADD_CATEGORY:
      return {
        ...state,
        id: nextBiggest(state),
        name: action.name
      };

    case types.EDIT_CATEGORY:
      return state.map(category =>
        category.id === action.id ?
          { ...category, name: action.name } :
          category
      );

    case types.DELETE_CATEGORY:
      return state.filter(x => x.id !== action.id);

    default:
      return state;
  }
}

function questions(state = defaultState.questions, action) {
  switch (action.type) {
    case types.ADD_QUESTION:
      return [...state, {
        body: action.body,
        id: nextBiggest(state),
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
        id: nextBiggest(state),
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

    default:
      return state;
  }
}

export default combineReducers({
  metadata,
  categories,
  questions,
  answers
});
