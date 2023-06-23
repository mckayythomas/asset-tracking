const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.delete('/', userController.deleteUser)

module.exports = router
