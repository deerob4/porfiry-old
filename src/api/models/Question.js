import mongoose from 'mongoose';
import answerSchema from './Answer';

const questionSchema = new mongoose.Schema({
  title: String,
  answers: [answerSchema]
});

export default questionSchema;
