const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const daySchema = new Schema({
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
  excersises: [{
    type: Schema.Types.ObjectId,
    ref: 'Excersise'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Day', daySchema);