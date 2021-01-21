
const userService = require('../services/user.service');

const insert = (data, next) => {
    userService.insertMany(data, (result) => {
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

    userService.find(query, {page, limit}, (result) => {
        next(result);
    })
}

const update = (id, data, next) => {
    userService.update(id, data, (result) => {
        next(result)
    })
}

const remove = (id, next) => {
    userService.remove(id, (result) => {
        next(result)
    })
}

module.exports = {insert, find, update, remove};