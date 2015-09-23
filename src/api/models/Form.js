import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
  house: String,
  year: Number,
});

export default mongoose.model('Form', formSchema);
