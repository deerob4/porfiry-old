import { combineReducers } from 'redux';
import quiz from './quizReducer';
import { house, colours } from './globalReducer';

const rootReducer = combineReducers({
  house,
  quiz,
  colours
});

export default rootReducer;
