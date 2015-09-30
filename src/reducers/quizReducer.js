import * as types from 'constants/MakerActions';
import nextBiggest from 'utils/nextBiggest';

export function categories(state = [], action) {
  switch (action.type) {
    case types.ADD_CATEGORY:
      return Object.assign({}, state, {
        id: nextBiggest(state),
        name: action.name
      });

    case types.EDIT_CATEGORY:
      return state.map(category =>
        category.id === action.id ?
          Object.assign({}, category, { name: action.name }) :
          category
      );

    case types.DELETE_CATEGORY:
      return state.filter(x => x.id !== action.id);

    default:
      return state;
  }
}

export function questions(state = [], action) {
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
          Object.assign({}, question, { body: action.body }) :
          question
      );

    case types.DELETE_QUESTION:
      return state.filter(x => x.id !== action.id);

    default:
      return state;
  }
}

export function answers(state = [], action) {
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
          Object.assign({}, answer, {
            body: action.body,
            correct: action.correct
          }) :
          answer
      );

    case types.DELETE_ANSWER:
      return state.filter(x => x.id !== action.id);

    default:
      return state;
  }
}
