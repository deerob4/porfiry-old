import mongoose from 'mongoose';
import questionSchema from './Question';

const categorySchema = new mongoose.Schema({
  name: String,
  questions: [questionSchema]
});

export default categorySchema;
