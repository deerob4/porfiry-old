function flattenQuiz(quiz) {
  console.log(quiz);
  let categories = quiz.categories.map((category, id) => ({ body: category.body, id })).reduce((a, b) => a.concat(b), []);

  let questions = quiz.categories.map((category, categoryId) =>
    category.questions.map(question => ({ body: question.body, categoryId }))
  ).reduce((a, b) => a.concat(b), []);

  let answers = quiz.categories.map(category =>
    category.questions.map((question, questionId) =>
      question.answers.map(answer => ({ body: answer.body, correct: answer.correct, questionId }))
    )
  ).reduce((a, b) => a.concat(b), []).reduce((a, b) => a.concat(b), []);

  return {
    settings: {
      id: quiz._id,
      title: quiz.title,
      startTime: quiz.startDate,
      startDate: quiz.startDate,
      breakLength: quiz.breakLength,
      questionLength: quiz.questionLength
    },
    categories,
    questions,
    answers
  };
}

export default flattenQuiz;
