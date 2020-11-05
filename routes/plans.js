const express = require('express');

const plansControllers = require('../controllers/plans')

const router = express.Router();

router.get('/plans', plansControllers.getPlans);

module.exports = router;