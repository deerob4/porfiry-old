import mongoose from 'mongoose';
import categorySchema from './Category';

const quizSchema = new mongoose.Schema({
  title: String,
  startDate: Date,
  questionLength: Number,
  breakLength: Number,
  isFinished: Boolean,
  categories: [categorySchema]
});

export default mongoose.model('Quiz', quizSchema);
