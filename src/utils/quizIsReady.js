import moment from 'moment';

function isQuizReady(quiz) {
  let minutesToStart = moment(quiz.startDate).diff(moment(), 'minutes');
  return minutesToStart >= -5 && minutesToStart < 30;
}

export default isQuizReady;
