var express = require('express');
var router = express.Router();

const {verifyAuth} = require('../utils/auth.utils');

const userController = require('../controller/user.controller');

router.get('/:id?', (req, res) => {
    userController.find(req.params.id ? {_id: req.params.id} : {}, req.query ? req.query : {}, (result) => {
        res.status(result.statusCode).send(result.data ? result.data : result.error)
    });    
});

router.post('/', (req, res) => {
    userController.insert(req.body, (result) => {
        res.status(result.statusCode).send(result.data ? result.data : result.error)
    });
});

router.put('/:id', verifyAuth, (req,res) => {
    userController.update(req.params.id, req.body, (result) => {
        res.status(result.statusCode).send(result.data ? result.data : result.error)
    })
})

router.delete('/:id', verifyAuth, (req, res) => {
    userController.remove(req.params.id, (result) => {
        res.status(result.statusCode).send(result.data ? result.data : result.error)
    })
})

module.exports = router;
