import * as types from 'constants/actions';
import * as actions from 'actions/PlayQuizActions';
import { socketHost } from 'config';

function quizEvents(dispatch, historyProp) {
  const socket = require('socket.io-client')(`http://localhost:5000`);

  socket.on(types.BEGIN_QUIZ, () => {
    dispatch(actions.beginQuiz());
  });

  socket.on(types.LEAVE_QUIZ, () => {
    dispatch(actions.leaveQuiz(historyProp));
  });

  socket.on(types.ADD_PLAYER, (players) =>
    dispatch(actions.addPlayer(players))
  );

  socket.on(types.REMOVE_PLAYER, (socketId) =>
    dispatch(actions.removePlayer(socketId))
  );

  socket.on(types.DECREMENT_TIME_LEFT, (timeLeft) =>
    dispatch(actions.decrementTimeLeft(timeLeft))
  );

  socket.on(types.SHOW_NEXT_QUESTION, (questionId) =>
    dispatch(actions.showNextQuestion(questionId))
  );

  socket.on(types.RECEIVE_ANSWER, (answer) =>
    dispatch(actions.receiveAnswer(answer))
  );
}

export default quizEvents;
