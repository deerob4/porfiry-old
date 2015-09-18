import React from 'react';
import { App } from './App';

React.render(<App />, document.getElementById('root'));

function housePoints(packets, correct) {
  const houses = ['A', 'B', 'C', 'D', 'H', 'W'];
  
  let special = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    H: 0,
    W: 0
  };
  
  return packets.map(packet => (
    Object.assign({}, special, {
      [packet.house]: special[packet.house] += (
        packet.answer === correct && packet.peek === false? 1 :
        packet.answer === correct && packet.peek === true ? 0.5 : 0
      )
    })
  ));
}

console.log(housePoints(100), 'b')
