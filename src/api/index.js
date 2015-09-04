import express from 'express';

import forms from './routes/forms';
import quizzes from './routes/quizzes';

let router = express.Router();

router.use('/forms', forms);
router.use('/quizzes', quizzes);

export default router;
