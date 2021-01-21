var express = require('express');
var router = express.Router();

const {verifyAuth} = require('../utils/auth.utils');

const historyController = require('../controller/history.controller');

router.get('/:id?', verifyAuth, (req, res) => {
    historyController.find(req.params.id ? {id: req.params.id} : {}, req.query ? req.query : {}, (result) => {
        res.status(result.statusCode).send(result.data ? result.data : result.error)
    });    
});

module.exports = router;