const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
// require('dotenv').config();

const plansRoutes = require('./routes/plans');

const app = express();

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
  next();
});

app.use('/', plansRoutes);

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
