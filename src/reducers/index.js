import { combineReducers } from 'redux';
import { reducer as notifReducer } from 're-notif';
import quiz from './quizReducer';
import user from './userReducer';
import colours from './colourReducer';
import currentQuiz from './currentQuizReducer';

const rootReducer = combineReducers({
  user,
  quiz,
  colours,
  currentQuiz,
  notifs: notifReducer
});

export default rootReducer;
