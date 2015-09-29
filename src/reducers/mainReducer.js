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
        main: action.colours.main,
        secondary: action.colours.secondary
      });
    default:
      return state;
  }
}

export default { house, colours };
