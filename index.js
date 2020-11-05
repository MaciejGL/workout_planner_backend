const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');

const plansRoutes = require('./routes/plans')

const app = express();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(plansRoutes)
console.log(process.env.MONGO_DB)
mongoose.connect(
  `mongodb+srv://${process.env.MY_USER}:${process.env.MY_PASSWORD}@cluster0.cnqqj.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  () => {
    app.listen(4000);
    console.log('App is running on port: 4000!')
  }
);