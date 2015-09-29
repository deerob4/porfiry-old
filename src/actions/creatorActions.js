import {
  ADD_QUESTION,
  DELETE_QUESTION,
  EDIT_QUESTION,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  ADD_ANSWER,
  DELETE_ANSWER,
  EDIT_ANSWER
} from 'constants/creator';

// Question action creators.
function addQuestion(text) {
  return { ADD_QUESTION, text  };
}

function deleteQuestion(questionID) {
  return { DELETE_QUESTION, questionID  };
}

function editQuestion(questionID, text) {
  return { EDIT_QUESTION, questionID, text  };
}

// Category action creators.
function addCategory(name) {
  return { ADD_CATEGORY, name  };
}

function deleteCategory(categoryID) {
  return { DELETE_CATEGORY, categoryID  };
}

function editCategory(categoryID) {
  return { EDIT_CATEGORY, categoryID  };
}

// Answer action creators.
function addAnswer(name) {
  return { ADD_ANSWER, name  };
}

function deleteAnswer(answerID) {
  return { DELETE_ANSWER, answerID  };
}

function editAnswer(answerID) {
  return { EDIT_ANSWER, answerID  };
}
