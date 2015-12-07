import { combineReducers } from 'redux';
import {
  ADD_PLAYER,
  REMOVE_PLAYER,
  UPDATE_CURRENT_QUESTION
} from 'constants/actions';

function players(state = [], action) {
  switch (action.type) {
    case ADD_PLAYER:
      return [...action.players];

    case REMOVE_PLAYER:
      return state.filter(player =>
        player.socketId !== action.socketId
      );

    default:
      return state;
  }
}

function currentQuestion(state = 0, action) {
  switch (action.type) {
    case UPDATE_CURRENT_QUESTION:
      return action.currentQuestion;

    default:
      return state;
  }
}

export default combineReducers({
  players,
  currentQuestion
});
