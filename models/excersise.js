const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const excersiseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  sets: {
    type: Number,
  },
  reps: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  duration: {
    type: String,
  },
  // creator: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
}, { timestamps: true });

module.exports = mongoose.model('Excersise', excersiseSchema);