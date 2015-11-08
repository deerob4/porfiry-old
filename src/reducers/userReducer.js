import * as types from 'constants/LoginActions';

let defaultState = { house: 'webb', year: 9 };

function user(state = defaultState, action) {
  switch (action.type) {
    case types.CHANGE_HOUSE:
      return { ...state, house: action.house };

    case types.CHANGE_YEAR:
      return { ...state, year: action.year };

    default:
      return state;
  }
}

export default user;
