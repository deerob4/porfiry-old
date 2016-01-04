import axios from 'axios';
import setQuiz from './setQuiz';
import config from '../../config';
import flattenQuiz from '../libs/flattenQuiz';
import quizIsReady from '../utils/quizIsReady';

// function searchForQuizzes(io) {
//   let quiz = {};

//   axios.get(`http://localhost:${config.port}/api/quizzes`)
//     .then(response => {
//       for (let receivedQuiz of response.data.quizzes) {
//         if (quizIsReady(receivedQuiz)) {
//           quiz = flattenQuiz(receivedQuiz);
//           setQuiz(io, quiz);
//           break;
//         }
//       }
//     })
//     .catch(err => console.log(err));

//   return quiz;
// }

async function searchForQuizzes(io) {
  let quizzes = await axios.get(`http://localhost:${config.port}/api/quizzes`);
  let theQuiz = {};

  for (let quiz of quizzes.data.quizzes) {
    if (quizIsReady(quiz)) {
      theQuiz = quiz;
    }
  }
  console.log(theQuiz);
  return theQuiz;
}

export default searchForQuizzes;
