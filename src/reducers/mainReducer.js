import { combineReducers } from 'redux';
import {  CHANGE_HOUSE  } from 'constants/main';

function house(state, action) {
  switch (action.type) {
    case CHANGE_HOUSE:
      return action.house;
    default:
      return state;
  }
}

function colours(state = {}, action) {
  switch (action.type) {
    case CHANGE_COLOURS:
      return Object.assign({}, state, {
        colours: action.colours
      });
    default:
      return state;
  }
}

export default { house, colours };
