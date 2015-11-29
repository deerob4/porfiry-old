import { combineReducers } from 'redux';
import { reducer as notifReducer } from 're-notif';
import quiz from './quizReducer';
import user from './userReducer';
import colours from './colourReducer';

const rootReducer = combineReducers({
  user,
  quiz,
  colours,
  notifs: notifReducer
});

export default rootReducer;
