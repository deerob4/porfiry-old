import * as types from 'constants/actions';

let defaultState = { house: 'webb', year: 9, quizzes: [] };

function user(state = defaultState, action) {
  switch (action.type) {
    case types.CHANGE_HOUSE:
      return { ...state, house: action.house };

    case types.CHANGE_YEAR:
      return { ...state, year: action.year };

    case types.RECEIVE_QUIZZES:
      return { ...state, quizzes: action.quizzes };

    default:
      return state;
  }
}

export default user;
