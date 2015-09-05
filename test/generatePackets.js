const answers = ['a', 'b', 'c', 'd'];
const houses = ['A', 'B', 'C', 'D', 'H', 'W'];
const years = [7, 8, 9, 10, 11];
const peek = [true, false];

const choice = array => array[Math.floor(Math.random() * array.length)];

let quizAnswers = [];

for (let i = 0; i <= 135000; i++) {
  quizAnswers.push({
    year: choice(years),
    house: choice(houses),
    answer: choice(answers),
    peek: choice(peek)
  });
};

console.log(quizAnswers);
