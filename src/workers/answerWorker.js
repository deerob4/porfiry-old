import * as types from 'constants/actions';

const socket = require('socket.io-client')(`http://localhost:5000`);

socket.on(types.RECEIVE_ANSWER, (answer) => {
  postMessage(answer.length);
});
