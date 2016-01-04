import moment from 'moment';
import { BEGIN_QUIZ } from '../constants/actions';

// function setQuiz(io, quiz) {
//   console.log(quiz);
//   if (isQuizReady(quiz)) {
//     quiz = flattenQuiz(quiz);

//     const wait = moment(quiz.settings.startDate).diff(moment());
//     setTimeout(() => io.emit(BEGIN_QUIZ), wait);
//   }
// }

function setQuiz(io, quizzes) {
  for (let quiz of quizzes) {
    const wait = moment(quiz.settings.startDate).diff(moment());
    setTimeout(() => io.emit(BEGIN_QUIZ), wait);
  }

  return quizzes[0];
}

export default setQuiz;
