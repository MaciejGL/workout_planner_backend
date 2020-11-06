const Week = require('../models/week');
const User = require('../models/user');
// const newWeek = {
//   "name": "Only Chest",
//   "description": "Plan for week 1",
//   "days": [{
//       "name": "Monday",
//       "excersises": [{
//           "name": "Bench press",
//           "sets": 3,
//           "reps": 10,
//           "weight": 70,
//           "duration": "30min",
//           "units": "kg"
//       }, {
//           "name": "Bench press",
//           "sets": 3,
//           "reps": 10,
//           "weight": 70,
//           "duration": "30min",
//           "units": "kg"
//       }, {
//           "name": "Bench press",
//           "sets": 3,
//           "reps": 10,
//           "weight": 70,
//           "duration": "30min",
//           "units": "kg"
//       }]
//   }, {
//       "name": "Tuesday",
//       "excersises": [{
//           "name": "Bench press",
//           "sets": 3,
//           "reps": 10,
//           "weight": 70,
//           "duration": "30min",
//           "units": "kg"
//       }, {
//           "name": "Bench press",
//           "sets": 3,
//           "reps": 10,
//           "weight": 70,
//           "duration": "30min",
//           "units": "kg"
//       }, {
//           "name": "Bench press",
//           "sets": 3,
//           "reps": 10,
//           "weight": 70,
//           "duration": "30min",
//           "units": "kg"
//       }]
//   }, {
//       "name": "Friday",
//       "excersises": [{
//           "name": "Bench press",
//           "sets": 3,
//           "reps": 10,
//           "weight": 70,
//           "duration": "30min",
//           "units": "kg"
//       }, {
//           "name": "Bench press",
//           "sets": 3,
//           "reps": 10,
//           "weight": 70,
//           "duration": "30min",
//           "units": "kg"
//       }, {
//           "name": "Bench press",
//           "sets": 3,
//           "reps": 10,
//           "weight": 70,
//           "duration": "30min",
//           "units": "kg"
//       }]
//   }, {
//       "name": "Saturday",
//       "excersises": [{
//           "name": "Bench press",
//           "sets": 3,
//           "reps": 10,
//           "weight": 70,
//           "duration": "30min",
//           "units": "kg"
//       }, {
//           "name": "Bench press",
//           "sets": 3,
//           "reps": 10,
//           "weight": 70,
//           "duration": "30min",
//           "units": "kg"
//       }, {
//           "name": "Bench press",
//           "sets": 3,
//           "reps": 10,
//           "weight": 70,
//           "duration": "30min",
//           "units": "kg"
//       }]
//   }]
// }

exports.getPlans = async (req, res, next) => {
  try {
    const week = await Week.find({});
    console.log({ week });
    res.status(200).send(week);
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ error: error.message });
  }
};
exports.postPlans = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.findById(req.userId);
    const week = new Week(req.body);
    const savedWeek = await week.save();
    user.plans.push(savedWeek._id);
    await user.save();
    res.status(200).send(savedWeek);
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ error: error.message });
  }
};
exports.deletePlan = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const deletedWeek = await Week.findByIdAndDelete(req.params.id);
    const updatedPlans = user.plans.filter(
      plan => plan._id.toString() !== req.params.id.toString(),
    );
    console.log(updatedPlans);
    user.plans = updatedPlans;
    await user.save();
    res.status(200).send('deletedWeek');
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ error: error.message });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const populated = await user.populate('plans').execPopulate();
    res.status(200).send(populated);
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ error: error.message });
  }
};
