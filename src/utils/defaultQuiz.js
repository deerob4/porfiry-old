import moment from 'moment';

const defaultQuiz = {
  settings: {
    id: '',
    title: 'Priory School Quiz',
    startTime: moment().format('hh:mm:ss'),
    startDate: moment().format('ddd MMM D YYYY'),
    questionLength: 10000,
    breakLength: 300000
  },
  categories: [
    { id: 0, body: 'Default' }
  ],
  questions: [
    { id: 0, categoryId: 0, body: 'I\'m the question title - tap to edit me!' }
  ],
  answers: [
    { id: 0, questionId: 0, body: 'I\'m the first possible answer!', correct: false },
    { id: 1, questionId: 0, body: 'You can edit any of us by tapping on our text.', correct: false},
    { id: 2, questionId: 0, body: 'See that bold check mark? It means I\'m the correct answer.', correct: true },
    { id: 3, questionId: 0, body: 'Tapping on another check mark will make that the correct answer.', correct: false }
  ]
};

export default defaultQuiz;
