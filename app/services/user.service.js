const db = require('./db.service');
const userModel = require('../models/user.model')(db.connectionDB());
const crypt = require('bcryptjs')

const insertMany = (data, next) => {
    if(data["password"]) data['password'] = crypt.hashSync(data['password'])

    db.insertMany(userModel, data, (result) => {
        next(result);
    });
}

const find = (query, optional, next) => {
    db.find(userModel, query, {limit: parseInt(optional.limit), skip: (optional.page*optional.limit)},(result) => {
        next(result);
    })
}

const update = (id, data, next) => {
    if(data["password"]) data['password'] = crypt.hashSync(data['password'])

    db.update(userModel, id, data, (result) => {
        if(result.statusCode == 404) result['error'] = {message: "Movie ID not found"}

        next(result);
    })
}

const remove = (id, next) => {
    db.remove(userModel, id, (result) => {
        if(result.statusCode == 404) result['error'] = {message: "Movie ID not found"}

        next(result)
    })
}

module.exports = {insertMany, find, update, remove}