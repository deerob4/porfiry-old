import axios from 'axios';
import setQuiz from './setQuiz';
import config from '../../config';
import flattenQuiz from '../libs/flattenQuiz';
import quizIsReady from '../utils/quizIsReady';

function searchForQuizzes(io) {
  axios.get(`http://localhost:${config.port}/api/quizzes`)
    .then(response => {
      for (let receivedQuiz of response.data.quizzes) {
        if (quizIsReady(receivedQuiz)) {
          const quiz = flattenQuiz(receivedQuiz);
          setQuiz(io, quiz);
          io.emit('new quiz', quiz);
          break;
        }
      }
    })
    .catch(err => console.log(err));
}

export default searchForQuizzes;
