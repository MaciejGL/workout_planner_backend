const express = require('express');

const authControllers = require('../controllers/auth');

const router = express.Router();

router.post('/auth/signup', authControllers.signup);
router.post('/auth/login', authControllers.login);


module.exports = router;
