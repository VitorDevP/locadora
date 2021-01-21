var express = require('express');
var router = express.Router();

const {verifyAuth} = require('../utils/auth.utils');

const historyController = require('../controller/history.controller');

router.get('/:id?', verifyAuth, historyController.find)

module.exports = router;