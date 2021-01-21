
const productService = require('../services/movie.service');

const insert = (data, next) => {
    productService.insertMany(data, (result) => {
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

    productService.find(query, {page, limit}, (result) => {
        next(result);
    })
}

const update = (id, data, next) => {
    productService.update(id, data, (result) => {
        next(result)
    })
}

const remove = (id, next) => {
    productService.remove(id, (result) => {
        next(result)
    })
}

module.exports = {insert, find, update, remove};