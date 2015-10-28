import * as types from 'constants/MakerActions';

// Quiz metadata actions.
export function updateTitle(title) {
  return { type: types.UPDATE_TITLE, title };
}

export function updateStartTime(startTime) {
  return { type: types.UPDATE_START_TIME, startTime };
}

export function updateQuestionIntervals(questionIntervals) {
  return { type: types.UPDATE_QUESTION_INTERVALS, questionIntervals };
}

export function updateRealtimeGraphics(realtimeGraphics) {
  return { type: types.UPDATE_REALTIME_GRAPHICS, realtimeGraphics };
}

export function updateIntervalLength(intervalLength) {
  return { type: types.UPDATE_INTERVAL_LENGTH, intervalLength };
}


// Quiz category actions.
export function addCategory(name) {
  return { type: types.ADD_CATEGORY, name };
}

export function editCategory(id, name) {
  return { type: types.EDIT_CATEGORY, id, name };
}

export function deleteCategory(id) {
  return { type: types.DELETE_CATEGORY, id };
}


// Quiz question actions.
export function addQuestion(categoryId, body) {
  return { type: types.ADD_QUESTION, categoryId, body };
}

export function editQuestion(id, body) {
  return { type: types.EDIT_QUESTION, id, body };
}

export function deleteQuestion(id) {
  return { type: types.DELETE_QUESTION, id };
}


// Quiz answer actions.
export function addAnswer(questionId, body, correct) {
  return { type: types.ADD_ANSWER, questionId, body, correct };
}

export function editAnswer(id, body, correct) {
  return { type: types.EDIT_ANSWER, id, body, correct };
}

export function deleteAnswer(id) {
  return { type: types.DELETE_ANSWER, id };
}
