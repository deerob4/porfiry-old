function nextBiggest(array, key = 'id') {
  // Finds the next biggest value in an array.
  return Math.max(...array.reduce((arr, obj) =>
    [...arr, obj[key]]
  )) + 1;
}

export default nextBiggest;
