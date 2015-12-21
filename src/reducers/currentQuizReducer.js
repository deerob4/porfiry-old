import { combineReducers } from 'redux';
import {
  ADD_PLAYER,
  REMOVE_PLAYER,
  DECREMENT_TIME_LEFT,
  SHOW_NEXT_QUESTION,
  UPDATE_ANSWER_STATISTICS
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
      return state + 1;

    default:
      return state;
  }
}

function timeLeft(state = 10000, action) {
  switch (action.type) {
    case DECREMENT_TIME_LEFT:
      return action.timeLeft;

    default:
      return state;
  }
}

function answerStatistics(state = {}, action) {
  switch (action.type) {
    case UPDATE_ANSWER_STATISTICS:
      return action.answers;

    default:
      return state;
  }
}

export default combineReducers({
  players,
  timeLeft,
  currentQuestion,
  answerStatistics
});
