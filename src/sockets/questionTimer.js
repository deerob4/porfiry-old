import {
  SHOW_NEXT_QUESTION,
  DECREMENT_TIME_LEFT
} from '../constants/actions';

/**
 * Begins the countdown timer for questions.
 *
 * This function emits a socket ever second,
 * telling all clients the amount of time till
 * the question will move on, ensuring that the
 * same time is displayed on every screen, and
 * the question is changed at the precise moment.
 *
 * @param  {Number} questionLength The time between each question.
 * @return {Socket}                Whether to countdown, or change question.
 */
function questionTimer(io, questionLength = 10000) {
  let timeLeft = questionLength;

  setInterval(() => {
    if (timeLeft) {
      timeLeft -= 1000;
      io.emit(DECREMENT_TIME_LEFT, timeLeft);
    } else {
      timeLeft = questionLength;
      io.emit(SHOW_NEXT_QUESTION);
    }
  }, 1000);
}

export default questionTimer;
