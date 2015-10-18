import * as types from 'constants/MakerActions';
import nextBiggest from 'utils/nextBiggest';
import { combineReducers } from 'redux';

const defaultState = {
  categories: [
    { id: 0, name: 'Literature' }
  ],
  questions: [
    { id: 0, categoryId: 0, body: 'Who was Henry VIII\'s first wife?' },
    { id: 1, categoryId: 0, body: 'Who played the Eigth Doctor?' }
  ],
  answers: {
    0: [
      {
        id: 0,
        body: 'Ann Boleyn',
        correct: false
      },
      {
        id: 1,
        body: 'Jane Seymour',
        correct: false
      },
      {
        id: 2,
        body: 'Catherine of Aragon',
        correct: true
      },
      {
        id: 4,
        body: 'Keir Merchant',
        correct: false
      }
    ],
    1: [
      {
        id: 0,
        body: 'Paul Mcgann',
        correct: true
      },
      {
        id: 1,
        body: 'David Tennant',
        correct: false
      },
      {
        id: 2,
        body: 'Tom Baker',
        correct: false
      },
      {
        id: 3,
        body: 'Keir Merchant',
        correct: false
      }
    ]
  }
};

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
      return [{
        body: action.body,
        id: nextBiggest(state),
        categoryId: action.categoryId
      }, ...state];

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
      return [{
        body: action.body,
        correct: action.correct,
        id: nextBiggest(state),
        questionId: action.questionId
      }, ...state];

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
  categories,
  questions,
  answers
});
