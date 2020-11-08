const Plan = require('../models/plan');
const User = require('../models/user');

const isAuthValidation = isAuth => {
  if (!isAuth) {
    throw new Error('User not authorized.')
  }
}

exports.getPlans = async (req, res, next) => {
  try {
    isAuthValidation(req.isAuth)
    const plan = await Plan.find({creator: req.userId});
    res.status(200).send(plan);
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ error: error.message });
  }
};

exports.postPlans = async (req, res, next) => {
  try {
    isAuthValidation(req.isAuth);
    const user = await User.findById(req.userId);
    const plan = new Plan({...req.body, creator: user._id});
    const savedPlan = await plan.save();
    user.plans.push(savedPlan._id);
    await user.save();
    res.status(200).send(savedPlan);
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ error: error.message });
  }
};
exports.deletePlan = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const deletedPlan = await Plan.findByIdAndDelete(req.params.id);
    const updatedPlans = user.plans.filter(
      plan => plan._id.toString() !== req.params.id.toString(),
    );
    console.log(updatedPlans);
    user.plans = updatedPlans;
    await user.save();
    res.status(200).send('deletedPlan');
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
