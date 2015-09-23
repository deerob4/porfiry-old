import mongoose from 'mongoose';
import categorySchema from './Category';

const quizSchema = new mongoose.Schema({
  title: String,
  start: Date,
  questionIntervals: Number,
  realtimeGraphics: Boolean,
  intervalLength: Number,
  categories: [categorySchema]
});

export default mongoose.model('Quiz', quizSchema);
