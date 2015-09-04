import mongoose from 'mongoose';

export let answerSchema = new mongoose.Schema({
  text: String,
  correct: Boolean
});

export default answerSchema;
