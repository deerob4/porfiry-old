import { combineReducers } from 'redux';
import quiz from './quizReducer';
import user from './loginReducer';

const rootReducer = combineReducers({
  user,
  quiz
});

export default rootReducer;
