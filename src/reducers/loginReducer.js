import { combineReducers } from 'redux';
import * as types from 'constants/LoginActions';

function house(state = 'acton', action) {
  switch (action.type) {
    case types.CHANGE_HOUSE:
      return action.house;
    default:
      return state;
  }
}

function year(state = '', action) {
  switch (action.type) {
    case types.CHANGE_YEAR:
      return action.year;
    default:
      return state;
  }
}

export default combineReducers({ year, house });
