import * as types from 'constants/MakerActions';
import nextBiggest from 'utils/nextBiggest';
import { combineReducers } from 'redux';

// The default data that the quiz will show upon
// initialisation.
const defaultState = {
  categories: [
    { id: 0, name: 'Default category' }
  ],
  questions: [
    { id: 0, categoryId: 0, body: 'I\'m the question title - tap to edit me!' }
  ],
  answers: [
    { id: 0, questionId: 0, body: 'I\'m the first possible answer!', correct: false },
    { id: 1, questionId: 0, body: 'You can edit any of us by tapping our text.', correct: false},
    { id: 2, questionId: 0, body: 'See that light? It means I\'m the right answer.', correct: true },
    { id: 3, questionId: 0, body: 'It\'s no fun being fourth!', correct: false }
  ]
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
