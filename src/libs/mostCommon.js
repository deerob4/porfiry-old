/**
 * Returns the most common element in an array.
 * 
 * @param  {Object[]} array array
 * @return {string|number} Most common element.
 */
//  mostCommon :: Array -> String
function mostCommon(array) {
  let frequency = {};
  let max = 0;
  let result = undefined;

  for (let v in array) {
    frequency[array[v]] = (frequency[array[v]] || 0) + 1;

    if (frequency[array[v]] > max) {
      max = frequency[array[v]];
      result = array[v];
    }
  }

  return result;
}

export default mostCommon;
