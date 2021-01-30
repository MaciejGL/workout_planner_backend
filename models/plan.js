const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new Schema({
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
  workoutWeeks: [{
    type: Schema.Types.ObjectId,
    ref: 'Weeks'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema);