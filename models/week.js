const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weekSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  workoutDays: [{
    type: Schema.Types.ObjectId,
    ref: 'Day'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Week', weekSchema);