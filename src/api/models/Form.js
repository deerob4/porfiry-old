import mongoose from 'mongoose';

let formSchema = new mongoose.Schema({
  house: String,
  year: Number,
});

export default mongoose.model('Form', formSchema);
