var response = require('../utils/httpResponse.utils');
const db = require('./db.service');
const productModel = require('../models/movie.model')(db.connectionDB());

const insertMany = (data, next) => {
    db.insertMany(productModel, data, (result) => {
        next(result);
    });
}

const find = (query, optional, next) => {
    db.find(productModel, query, {limit: parseInt(optional.limit), skip: (optional.page*optional.limit)},(result) => {
        next(result);
    })
}

const update = (id, data, next) => {
    db.update(productModel, id, data, (result) => {
        if(result.statusCode == 404) result['error'] = {message: "Movie ID not found"}

        next(result);
    })
}

const remove = (id, next) => {
    db.remove(productModel, id, (result) => {
        if(result.statusCode == 404) result['error'] = {message: "Movie ID not found"}

        next(result)
    })
}

module.exports = {insertMany, find, update, remove}