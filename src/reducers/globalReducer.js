import { combineReducers } from 'redux';
import * as types from 'constants/GlobalActions';

function house(state = 'Acton', action) {
  switch (action.type) {
    case types.CHANGE_HOUSE:
      return action.house;
    default:
      return state;
  }
}

function colours(state = {}, action) {
  switch (action.type) {
    case types.CHANGE_COLOURS:
      return {...state, ...action.colours};
    default:
      return state;
  }
}

export default { house, colours };
