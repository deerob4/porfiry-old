import moment from 'moment';
import schedule from 'node-schedule';
import {
  BEGIN_QUIZ,
  BEGIN_QUIZ_COUNTDOWN
} from '../constants/actions';

function scheduleQuiz(io, quiz) {
  const quizStart = new Date(quiz.settings.startDate);
  let wow = schedule.scheduleJob(quizStart, () => console.log('wowowowowowow'));
  console.log(wow);
  if (moment(quizStart).isAfter(moment())) {
    let countdownStart = moment(quizStart).subtract(20, 'minutes');
    let x = schedule.scheduleJob(countdownStart, () => io.emit(BEGIN_QUIZ_COUNTDOWN));
    let y = schedule.scheduleJob(quizStart, () => {
      console.log('it begins!');
      io.emit(BEGIN_QUIZ);
    });
  }
}

export default scheduleQuiz;
