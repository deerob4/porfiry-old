import mostCommon from './mostCommon';
import { HOUSES, YEAR_GROUPS } from '../constants/globals';

/**
 * Calculates the most common answers in each form.
 * 
 * @param  {Object} answers
 * @return {Object} Most common answers.
 */
//  join :: Object -> Object
function generateAnswerStatistics(answers) {
  let quizAnswers = {};

  HOUSES.map(house => {
    YEAR_GROUPS.map(year => {
      // Set the house property on the quizAnswers var either to
      // itself from previous passes or an empty object.
      quizAnswers[house] = quizAnswers[house] || {};
      // Return the most common answer in each form.
      quizAnswers[house][year] = mostCommon(answers.filter(answer =>
        answer.house === house[0] && answer.year === year
      ).reduce((answers, request) => [...answers, request.answer])); // Flatten the array to just the values.

      if (year === 11) {
        // Get all the values that have just been generated.
        let results = Object.keys(quizAnswers[house]).map(k => quizAnswers[house][k]);
        quizAnswers[house]['mode'] = mostCommon(results);
      }
    });
  });

  return quizAnswers;
}

export default generateAnswerStatistics;
