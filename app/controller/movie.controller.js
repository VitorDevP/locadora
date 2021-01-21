
const productService = require('../services/movie.service');

const insert = (req, res) => {
    productService.insertMany(req.body, (result) => {
        res.status(result.statusCode).send(result.data ? result.data : result.error)
    })
}

const find = (req, res) => {
    const query = req.params.id ? req.params : {}
    const limit = req.query.limit ? req.query.limit : {};
    const page = req.query.page ? req.query.limit : {};

    for (var key in req.query){
        if(key != "page" && key != "limit"){
            query[key] = req.query[key];
        }
    }

    productService.find(query, {page, limit}, (result) => {
        res.status(result.statusCode).send(result.data ? result.data : result.error)
    })
}

const update = (req, res) => {
    if(req.params.id == null || req.params.id == undefined) {
        res.status(400).send("BAD REQUEST");
    }
    else{
        productService.update(req.params.id, req.body, (result) => {
            res.status(result.statusCode).send(result.data ? result.data : result.error)
        })
    }
}

const remove = (req, res) => {
    if(req.params.id == null || req.params.id == undefined) {
        res.status(400).send("BAD REQUEST");
    }
    else{
        productService.remove(req.params.id, (result) => {
            res.status(result.statusCode).send(result.data ? result.data : result.error)
        })
    }    
}

module.exports = {insert, find, update, remove};