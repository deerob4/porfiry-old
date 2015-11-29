import redis from 'redis';
import * as types from './constants/actions';

// Look into getting the keys to expire at the end of each quiz.

function quizSockets(server) {
  const io = require('socket.io').listen(server);
  const client  = redis.createClient();
  let users = [];

  client.on('err', (err) => console.log(err));

  io.on('connection', (socket) => {
    // Add the user to the array of connections.
    socket.on(types.JOIN_QUIZ, (form) => users.push({ socket, form }));

    socket.on('disconnect', () => {
      // Remove the user from the array of connections.
      users = users.filter(user => user.socket.id !== socket.id);
    });
  });
}

export default quizSockets;
