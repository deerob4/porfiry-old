import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  text: String,
  correct: Boolean
});

export default answerSchema;
