const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { herokuKeepAwake } = require('./utils/herokuKeepAwake');

const plansRoutes = require('./routes/plans');
const authRoutes = require('./routes/auth');
const isAuth = require('./middleware/isAuth');

const app = express();

herokuKeepAwake();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  // req.userId = '5fa47d0477cdfa0a96e57690';
  next();
});
app.use(isAuth);
app.use(plansRoutes);
app.use(authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

const port = process.env.PORT || 8080;
mongoose.connect(
  `mongodb+srv://${process.env.MY_USER}:${process.env.MY_PASSWORD}@cluster0.cnqqj.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  () => {
    app.listen(port);
    console.log(`App is running on port: ${port}!`);
  },
);
