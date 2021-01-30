const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/user');


exports.signup = async (req, res, next) => {
  try {
   const user = await User.findOne({email: req.body.email})
   console.log({user});
   if (user) {
       throw new Error('User already exists.');
   }
   if (req.body.password.trim().length < 6) {
       throw new Error('Password is too short. Please type minimum 3 characters.')
   }
   const hashedPassword = await bcrypt.hash(req.body.password, 12)
   const newUser = new User({
       ...req.body,
       password: hashedPassword,
       emailConfirmed: false,
       plans: [],
       statistics: []
   })
   const createdUser = await newUser.save();
   res.status(201).send({...createdUser._doc, _id: createdUser._id.toString()})
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ error: error.message });
  }
};
exports.login = async (req, res, next) => {
  try {
   const user = await User.findOne({email: req.body.email})
   console.log({user});
   if (!user) {
       throw new Error('User does not exist.');
   }
   const passwordIsEqual = await bcrypt.compare(req.body.password, user.password);
   if (!passwordIsEqual) {
       throw new Error('Incorrect password');
   }
   const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET);

    const responseObj = {
        userId: user._id,
        token: token,
    };
   res.status(200).send(responseObj)
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ error: error.message });
  }
};