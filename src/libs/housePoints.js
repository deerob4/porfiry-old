import isEmpty from 'lodash/lang/isEmpty';

function housePoints(packet, correct, keys, prop, state = {}) {
  // If an empty object is passed in, initialise the state by
  // creating an object where each key is a prop, set to 0.
  isEmpty(state) ? keys.forEach(key => state[key] = 0) : null;

  return Object.assign({}, state, {
    [packet[prop]]: state[packet[prop]] += (
      // If the answer is correct and they didn't peek.
      packet.answer === correct && packet.peek === false ? 1 :
      // If the answer is correct but they did peek. Otherwise
      // don't give them anything.
      packet.answer === correct && packet.peek === true ? 0.5 : 0
    )
  });
}

export default housePoints;
