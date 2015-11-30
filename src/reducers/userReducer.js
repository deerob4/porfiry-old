import * as types from 'constants/actions';

let defaultState = { house: 'acton', year: 7, quizzes: [], quizIsReady: false };

function user(state = defaultState, action) {
  switch (action.type) {
    case types.CHANGE_HOUSE:
      return { ...state, house: action.house };

    case types.CHANGE_YEAR:
      return { ...state, year: action.year };

    case types.RECEIVE_QUIZZES:
      return { ...state, quizzes: action.quizzes };

    case types.QUIZ_IS_READY:
      return { ...state, quizIsReady: true };

    default:
      return state;
  }
}

export default user;
