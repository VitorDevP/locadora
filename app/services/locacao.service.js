const db = require('./db.service');
const locacaoModel = require('../models/history.model');

const insertMany = (data, next) => {
    db.insertMany(locacaoModel, data, (result) => {
        next(result);
    });
}

const find = (query, optional, next) => {
    db.find(locacaoModel, query, {limit: parseInt(optional.limit), skip: (optional.page*optional.limit)},(result) => {
        next(result);
    })
}

module.exports = {insertMany, find}