const express = require('express');

const plansControllers = require('../controllers/plans');

const router = express.Router();

router.get('/plans', plansControllers.getPlans);
router.post('/plans', plansControllers.postPlans);
router.get('/user', plansControllers.getUser);
router.get((req, res, next) => res.send({ message: 'Wrong route' }));

module.exports = router;
