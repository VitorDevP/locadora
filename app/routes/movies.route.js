var express = require('express');
var router = express.Router();

const {verifyAuth} = require('../utils/auth.utils');

const productController = require('../controller/movie.controller');

router.get('/:id?', verifyAuth, productController.find)

router.post('/', verifyAuth, productController.insert)

router.put('/:id', verifyAuth, productController.update)

router.delete('/:id', verifyAuth, productController.remove)

module.exports = router;
