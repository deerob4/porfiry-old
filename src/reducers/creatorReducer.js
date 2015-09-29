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

function categories(state = {}, action) {
  switch (action.type) {
    case ADD_CATEGORY:
      return Object.assign({}, state, {
        [action.name]: []
      });
    default:
      return state;
  }
}
