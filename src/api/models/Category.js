import mongoose from 'mongoose';
import questionSchema from './Question';

const categorySchema = new mongoose.Schema({
  body: String,
  questions: [questionSchema]
});

export default categorySchema;
