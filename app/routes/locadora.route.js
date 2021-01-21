var express = require('express');
var router = express.Router();

const {verifyAuth} = require('../utils/auth.utils');

const locadoraController = require('../controller/locadora.controller');

router.get('/:id?', verifyAuth, locadoraController.find)

router.post('/', verifyAuth, locadoraController.insert)

router.put('/:id', verifyAuth, locadoraController.update)

router.delete('/:id', verifyAuth, locadoraController.remove)

router.get('/devolucao/:id', verifyAuth, locadoraController.devolucao)

module.exports = router;
