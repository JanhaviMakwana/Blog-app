const { login, signup } = require('../controllers/auth');
const express = require('express');
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

module.exports = router;