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
  days: {
    type: Array,
  }
}, { timestamps: true });

module.exports = mongoose.model('Week', weekSchema);