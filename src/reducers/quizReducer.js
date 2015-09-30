import * as types from 'constants/MakerActions';
import nextBiggest from 'utils/nextBiggest';

function categories(state = [], action) {
  switch (action.type) {
    case types.ADD_CATEGORY:
      return [{
        id: nextBiggest(state),
        name: action.name
      }, ...state ];

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

function questions(state = {}, action) {
  switch (action.type) {
    case types.ADD_QUESTION:
      return Object.assign({}, state, {
        [action.id]: [{
          id: nextBiggest(state[action.id]),
          body: action.body
        }, ...state[action.id]]
      });

    case types.EDIT_QUESTION:
      return Object.assign({}, state, {
        [action.id]: state[action.id].map(question =>
          question.id === action.id ?
            Object.assign({}, question, { body: action.body }) :
            question
        )
      });

    case types.DELETE_QUESTION:
      return Object.assign({}, state, {
        [action.id]: state[action.id].filter(question =>
          question.id !== action.id
        )
      });

    default:
      return state;
  }
}
