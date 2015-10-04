import { combineReducers } from 'redux';
import quiz from './quizReducer';
import { user, colours } from './loginReducer';

const rootReducer = combineReducers({
  user,
  quiz,
  colours
});

export default rootReducer;
