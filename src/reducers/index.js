import { combineReducers } from 'redux';
import quiz from './quizReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  user,
  quiz
});

export default rootReducer;
