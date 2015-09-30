import * as types from 'constants/MakerActions';

export function addCategory(name) {
  return { type: types.ADD_CATEGORY, name };
}

export function editCategory(id, name) {
  return { type: types.EDIT_CATEGORY, id, name };
}

export function deleteCategory(id) {
  return { type: types.DELETE_CATEGORY, id };
}

export function addQuestion(body) {
  return { type: types.ADD_QUESTION, body };
}

export function editQuestion(id, body) {
  return { type: types.EDIT_QUESTION, id, body };
}

export function deleteQuestion(id) {
  return { type: types.DELETE_QUESTION, id };
}

export function addAnswer(body) {
  return { type: types.ADD_ANSWER, body };
}

export function editAnswer(id, body) {
  return { type: types.EDIT_ANSWER, id, body };
}

export function deleteAnswer(id) {
  return { type: types.DELETE_QUESTION, id };
}
