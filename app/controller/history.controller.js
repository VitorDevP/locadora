
const historyService = require('../services/locacao.service');

const insert = (data, next) => {
    historyService.insertMany(data, (result) => {
        next(result)
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

    historyService.find(query, {page, limit}, (result) => {
        res.status(result.statusCode).send(result.data ? result.data : result.error)
    })
}

module.exports = {insert, find};