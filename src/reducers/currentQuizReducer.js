import { combineReducers } from 'redux';
import {
  ADD_PLAYER,
  REMOVE_PLAYER,
  SHOW_NEXT_QUESTION
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
    case SHOW_NEXT_QUESTION:
      return action.questionId;

    default:
      return state;
  }
}

export default combineReducers({
  players,
  currentQuestion
});
