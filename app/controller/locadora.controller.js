
const locadoraService = require('../services/locadora.service');
const historyController = require('../controller/history.controller');
const requestResponse = require('../utils/httpResponse.utils');

const insert = (data, next) => {
    locadoraService.insertMany(data, (result) => {
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

    locadoraService.find(query, {page, limit}, (result) => {
        next(result);
    })
}

const update = (id, data, next) => {
    locadoraService.update(id, data, (result) => {
        next(result)
    })
}

const remove = (id, next) => {
    locadoraService.remove(id, (result) => {
        next(result)
    })
}

const devolucao = (id, next) => {
    find({_id: id}, {}, (result) => {
        if(result.data != null && result.data.length == 1){
            const removeLocadora = new Promise((resolve, reject) => {
                try{
                    locadoraService.remove(id, (result) => {
                        resolve(result);
                    });
                }
                catch (err){
                    reject(err);
                }        
            })
            const addHistory = new Promise((resolve, reject) => {
                try{
                    const data = {
                        movieId: result.data[0].movieId,
                        userId: result.data[0].userId,
                        idLocacao: result.data[0]._id,
                        dateLocacao: result.data[0].dateLocacao
                    }

                    historyController.insert(data, (res) => {
                        if(res.statusCode == 201){
                            resolve(res);
                        }
                        else{
                            reject(res)
                        }
                    })
                }
                catch (err){
                    reject(err)
                }                        
            });

            Promise.all([addHistory, removeLocadora]).then((values) => {
                if(values[0].error || values[1].error) next(requestResponse(400,null, {status: "Failed"}))
                else next(requestResponse(200,null, {status:"success"}))
            }).catch((err) => next(requestResponse(500, err, null)));  
        }
        else{
            next(requestResponse(404, {message: "could not found id"}));
        }          
    });       
}

module.exports = {insert, find, update, remove, devolucao};