import { combineReducers } from 'redux';
import {
  DECREMENT_TIME_LEFT,
  SHOW_NEXT_QUESTION,
  MOVE_TO_CATEGORY,
  SELECT_ANSWER,
  RECEIVE_ANSWER,
  RECEIVE_HOUSE_POINTS,
  BEGIN_QUIZ,
  LEAVE_QUIZ
} from 'constants/actions';

function currentQuestion(state = 0, action) {
  switch (action.type) {
    case SHOW_NEXT_QUESTION:
      return action.questionId;

    default:
      return state;
  }
}

function currentCategory(state = 0, action) {
  switch (action.type) {
    case MOVE_TO_CATEGORY:
      return action.categoryId;

    default:
      return state;
  }
}

function selectedAnswer(state = null, action) {
  switch (action.type) {
    case SELECT_ANSWER:
      return action.answer;

    case SHOW_NEXT_QUESTION:
      return null;

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
      return { ...state, ...action.answer  };

    case RECEIVE_HOUSE_POINTS:
      return action.housePoints;

    default:
      return state;
  }
}

export default combineReducers({
  timeLeft,
  inProgress,
  selectedAnswer,
  currentQuestion,
  currentCategory,
  answerStatistics
});
