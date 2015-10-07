import { combineReducers } from 'redux';
import * as types from 'constants/LoginActions';

function house(state = '', action) {
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

export function colours(state = {}, action) {
  switch (action.type) {
    case types.CHANGE_COLOURS:
      return {...state, ...action.colours};
    default:
      return state;
  }
}

export const user = combineReducers({ year, house });
