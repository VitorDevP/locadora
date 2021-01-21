var express = require('express');
var router = express.Router();

const {verifyAuth} = require('../utils/auth.utils');

const authController = require('../controller/auth.controller');

router.get('/', (req, res) => {
    authController.login(req.body ? req.body : {}, (result) => {
        res.status(result.statusCode).send(result.data ? result.data : result.error)
    });    
});

router.get('/logout', verifyAuth, (req, res) => {
    authController.find(req.body ? req.body : {}, (result) => {
        res.status(result.statusCode).send(result.data ? result.data : result.error)
    });    
});


module.exports = router;
