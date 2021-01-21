var express = require('express');
var router = express.Router();

const {verifyAuth, getToken} = require('../utils/auth.utils');

const authController = require('../controller/auth.controller');

router.get('/', authController.login)

router.get('/logout', verifyAuth, authController.logout)

module.exports = router;
