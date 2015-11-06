import mongoose from 'mongoose';
import answerSchema from './Answer';

const questionSchema = new mongoose.Schema({
  body: String,
  answers: [answerSchema]
});

export default questionSchema;
