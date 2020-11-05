const Week = require('../models/week');

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
