import moment from 'moment';
import { BEGIN_QUIZ } from '../constants/actions';

function setQuiz(io, quiz) {
  const wait = moment(quiz.settings.startDate).diff(moment());
  setTimeout(() => io.emit(BEGIN_QUIZ), wait);
}

export default setQuiz;
