import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  body: String,
  correct: Boolean
});

export default answerSchema;
