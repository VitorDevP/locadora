const locadoraModel = require('../models/locadora.model');
const db = require('./db.service');
const movieModel = require('../models/movie.model')
const responseRequest = require('../utils/httpResponse.utils');

const insertMany = (data, next) => {
    const movie = new Promise((resolve, reject) => {
        db.find(movieModel, {_id: data.movieId},null, (result) => {
            if(result.error == null || result.error == undefined) resolve(result)
            else reject(result.error);
        })
    })

    const locadora = new Promise((resolve, reject) => {
        db.find(locadoraModel, {movieId: data.movieId},null, (locadoraResult) => {
            if(locadoraResult.error == null || locadoraResult.error == undefined) resolve(locadoraResult)
            else reject(locadoraResult.error);
        })
    })

    Promise.all([movie, locadora]).then(([movie, locadora]) => {
        if(movie.data[0].nTotal > locadora.data.length){
            db.insertMany(locadoraModel, data, (result) => {
                next(result);
            });
        }
        else{
            next(responseRequest(403,null,"No autorized, All available movies were rented"))
        }        
    }) 
}

const find = (query, optional, next) => {
    db.find(locadoraModel, query, {limit: parseInt(optional.limit), skip: (optional.page*optional.limit)},(result) => {
        next(result);
    })
}

const update = (id, data, next) => {
    db.update(locadoraModel, id, data, (result) => {
        if(result.statusCode == 404) result['error'] = {message: "Movie ID not found"}

        next(result);
    })
}

const remove = (id, next) => {
    db.remove(locadoraModel, id, (result) => {
        if(result.statusCode == 404) result['error'] = {message: "Movie ID not found"}

        next(result)
    })
}

module.exports = {insertMany, find, update, remove}