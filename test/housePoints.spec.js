import chai from 'chai';
import housePoints from '../src/libs/housePoints';
import cheat from './helpers/calculateHousePoints';
import generatePackets from './helpers/generatePackets';

const expect = chai.expect;

describe('housePoints', () => {
  it('calculates the correct scores', () => {
    // Generate a collection of fake answers.
    let packets = generatePackets(100);
    let houses = ['A', 'B', 'C', 'D', 'H', 'W'];
    let answer = 'b';
    // Calculate the correct answers.
    const correctHouseScores = cheat(packets, houses, answer);

    let nextState = {};
    // Loop through every answer packet,
    let testHouseScores = packets.map((packet, index) => {
      nextState = housePoints(packet, answer, houses, 'house', nextState);
      return nextState;
    });
    // Set the house scores to the last computed value of itself.
    testHouseScores = testHouseScores[testHouseScores.length - 1];

    expect(testHouseScores).to.eql(correctHouseScores);
  });
});

