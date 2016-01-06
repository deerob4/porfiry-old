import { combineReducers } from 'redux';
import {
  ADD_PLAYER,
  REMOVE_PLAYER,
  DECREMENT_TIME_LEFT,
  SHOW_NEXT_QUESTION,
  RECEIVE_ANSWER,
  BEGIN_QUIZ,
  LEAVE_QUIZ
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

function inProgress(state = false, action) {
  switch (action.type) {
    case BEGIN_QUIZ:
      return true;

    case LEAVE_QUIZ:
      return false;

    default:
      return state;
  }
}

function answerStatistics(state = {
  acton: 0,
  baxter: 0,
  clive: 0,
  darwin: 0,
  houseman: 0,
  webb: 0
}, action) {
  switch (action.type) {
    case RECEIVE_ANSWER:
      return { ...state, [action.house]: state[action.house] + 1  };

    default:
      return state;
  }
}

export default combineReducers({
  players,
  timeLeft,
  inProgress,
  currentQuestion,
  answerStatistics
});
