import { combineReducers } from 'redux';
import { reducer as notifReducer } from 're-notif';
import quiz from './quizReducer';
import user from './userReducer';
import colours from './colourReducer';

const rootReducer = combineReducers({
  notifs: notifReducer,
  user,
  quiz,
  colours
});

export default rootReducer;
