var express = require('express');
var router = express.Router();

const {verifyAuth} = require('../utils/auth.utils');

const userController = require('../controller/user.controller');

router.get('/:id?', verifyAuth, userController.find);

router.post('/', userController.insert);

router.put('/:id', verifyAuth, userController.update)

router.delete('/:id', verifyAuth, userController.remove)

module.exports = router;
