import express from 'express';

import Quiz from '../models/Quiz';

let router = express.Router();

/**
 * GET /api/quizzes
 * Returns all quizzes.
 */
router.get('/', (req, res) => {
  Quiz.find({}, '-__v', (err, quizzes) => {
    if (err) throw err;
    res.send({ quizzes });
  });
});

/**
 * POST /api/quizzes
 * Adds a new quiz to the database.
 */
router.post('/', (req, res) => {
  let quiz = new Quiz();

  quiz.title = req.body.title;
  quiz.startDate = req.body.startDate;
  quiz.questionLength = req.body.questionLength;
  quiz.breakLength = req.body.breakLength;
  quiz.categories = req.body.categories;

  quiz.save((err, quiz) => {
    if (err) throw err;
    res.send({ message: quiz.title + ' was saved!', quiz });
  });
});

/**
 * GET /api/quizzes/:id
 * Returns a specific quiz.
 * @param  {quizId} id The id of the quiz to return.
 */
router.get('/:quizId', (req, res) => {
  Quiz.findById(req.params.quizId, (err, quiz) => {
    if (err) throw err;
    res.send(quiz);
  });
});

/**
 * PUT /api/quizzes/:id
 * Updates a specific quiz.
 * @param  {Object_id} id The id of the quiz to update.
 */
router.put('/:quizId', (req, res) => {
  Quiz.findById(req.params.quizId, (err, quiz) => {
    if (err) throw err;

    for (let property in req.body) {
      quiz[property] = req.body[property];
    }

    quiz.save(err => {
      if (err) throw err;
      res.send({ message: 'Quiz updated!', quiz });
    });
  });
});

/**
 * DELETE /api/quizzes/:id
 * Deletes a specific quiz.
 * @param  {Object_id} id The id of the quiz to delete.
 */
router.delete('/:quizId', (req, res) => {
  Quiz.remove({ _id: req.params.quizId }, (err, quiz) => {
    if (err) throw err;
    res.send({ message: 'Quiz was deleted!' });
  });
});

export default router;
