const express = require('express');
const router = express.Router();
const verifyLogin = require('../middleware/auth')


router.get('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.send(req.user.displayName + ', Welcome to asset tracking made easy.');
    } else {
        res.send('Welcome to asset tracking made easy. Please login.');
    }
  });

router.use('/auth', require('./auth'));

router.use('/user', require('./user'));

module.exports = router;