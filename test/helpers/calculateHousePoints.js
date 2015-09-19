/**
 * Calculates the house points each house has earned.
 *
 * @param  {Object} payload The payload
 * @param  {string} correct
 * @return {Object} The house points.
 */
function caclulateHousePoints(payload, houses, correct) {
  let houseScores = {};

  houses.map(house => {
    houseScores[house] = houseScores[house] || 0;
    // The answers from the current house.
    let houseAnswers = payload.filter(answer => answer.house === house);

    houseAnswers.map(answer => {
      let correctAnswer = answer.answer === correct;
      let peeked = answer.peek;

      if (correctAnswer && !peeked) {
        houseScores[house] += 1;
      } else if (correctAnswer && peeked) {
        houseScores[house] += 0.5;
      }
    });
  });

  return houseScores;
}

export default caclulateHousePoints;
