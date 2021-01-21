
const historyService = require('../services/locacao.service');

const insert = (data, next) => {
    historyService.insertMany(data, (result) => {
        next(result);
    })
}

const find = (query, optional, next)=> {
    const limit = optional.limit;
    const page = optional.page;

    for (var key in optional){
        if(key != "page" && key != "limit"){
            query[key] = optional[key];
        }
    }

    historyService.find(query, {page, limit}, (result) => {
        next(result);
    })
}

module.exports = {insert, find};