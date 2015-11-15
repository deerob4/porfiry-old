import { combineReducers } from 'redux';
import { reducer as notifReducer } from 're-notif';
import quiz from './quizReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  notifs: notifReducer,
  user,
  quiz
});

export default rootReducer;
