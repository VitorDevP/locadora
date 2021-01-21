var express = require('express');
var router = express.Router();

const {verifyAuth} = require('../utils/auth.utils');

const productController = require('../controller/movie.controller');

router.get('/:id?', verifyAuth, (req, res) => {
    productController.find(req.params.id ? {id: req.params.id} : {}, req.query ? req.query : {}, (result) => {
        res.status(result.statusCode).send(result.data ? result.data : result.error)
    });    
});

router.post('/', verifyAuth, (req, res) => {
    productController.insert(req.body, (result) => {
        res.status(result.statusCode).send(result.data ? result.data : result.error)
    });
});

router.put('/:id', verifyAuth, (req,res) => {
    productController.update(req.params.id, req.body, (result) => {
        res.status(result.statusCode).send(result.data ? result.data : result.error)
    })
})

router.delete('/:id', verifyAuth, (req, res) => {
    productController.remove(req.params.id, (result) => {
        res.status(result.statusCode).send(result.data ? result.data : result.error)
    })
})

module.exports = router;
