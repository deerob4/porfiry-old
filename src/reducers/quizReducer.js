import * as types from 'constants/MakerActions';
import nextBiggest from 'utils/nextBiggest';
import { combineReducers } from 'redux';

function categories(state = [], action) {
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

function questions(state = [], action) {
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

function answers(state = [], action) {
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
