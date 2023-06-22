const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.send('Welcome to asset tracking made easy');
})

router.use('/users', require('./user'));

router.use('/auth', require('./auth'));

module.exports = router;