const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Welcome to asset tracking made easy');
})

module.exports = router;