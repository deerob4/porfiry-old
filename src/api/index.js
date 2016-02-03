import express from 'express';

import quizzes from './routes/quizzes';

let router = express.Router();

router.use('/quizzes', quizzes);

export default router;
