import mongoose from 'mongoose';

import questionSchema from './Question';

let categorySchema = new mongoose.Schema({
  name: String,
  questions: [questionSchema]
});

export default categorySchema;
