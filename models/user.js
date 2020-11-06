const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      // required: true,
    },
    age: {
      type: Number,
      // required: true,
    },
    weight: {
      type: Number,
      // required: true,
    },
    height: {
      type: Number,
      // required: true,
    },
    plans: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Week',
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
