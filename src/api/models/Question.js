import mongoose from 'mongoose';

import answerSchema from './Answer';

export let questionSchema = new mongoose.Schema({
  title: String,
  answers: [answerSchema]
});

export default questionSchema;
