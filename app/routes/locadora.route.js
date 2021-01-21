var express = require('express');
var router = express.Router();

const {verifyAuth} = require('../utils/auth.utils');

const locadoraController = require('../controller/locadora.controller');

router.get('/:id?', verifyAuth, (req, res) => {
    locadoraController.find(req.params.id ? {id: req.params.id} : {}, req.query ? req.query : {}, (result) => {
        res.status(result.statusCode).send(result.data ? result.data : result.error)
    });    
});

router.post('/', verifyAuth, (req, res) => {
    locadoraController.insert(req.body, (result) => {
        res.status(result.statusCode).send(result.data ? result.data : result.error)
    });
});

router.put('/:id', verifyAuth, (req,res) => {
    locadoraController.update(req.params.id, req.body, (result) => {
        res.status(result.statusCode).send(result.data ? result.data : result.error)
    })
})

router.delete('/:id', verifyAuth, (req, res) => {
    locadoraController.remove(req.params.id, (result) => {
        res.status(result.statusCode).send(result.data ? result.data : result.error)
    })
})

router.get('/devolucao/:id', verifyAuth, (req, res) => {
    locadoraController.devolucao(req.params.id, (result) => {
        res.status(result.statusCode).send(result.data ? result.data : result.error)
    })
})

module.exports = router;
