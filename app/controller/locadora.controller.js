
const locadoraService = require('../services/locadora.service');
const historyController = require('../controller/history.controller');
const requestResponse = require('../utils/httpResponse.utils');

const insert = (req, res) => {
    locadoraService.insertMany(req.body, (result) => {
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

    locadoraService.find(query, {page, limit}, (result) => {
        res.status(result.statusCode).send(result.data ? result.data : result.error)
    })
}

const update = (req, res) => {
    if(req.params.id == null || req.params.id == undefined) {
        res.status(400).send("BAD REQUEST");
    }
    else{
        locadoraService.update(req.params.id, req.body, (result) => {
            res.status(result.statusCode).send(result.data ? result.data : result.error)
        })
    }    
}

const remove = (req, res) => {
    if(req.params.id == null || req.params.id == undefined) {
        res.status(400).send("BAD REQUEST");
    }
    else{
        locadoraService.remove(req.params.id, (result) => {
            res.status(result.statusCode).send(result.data ? result.data : result.error)
        })
    }    
}

const devolucao = (req, res) => {
    if(req.params.id == null || req.params.id == undefined){
        res.status(400).send("BAD REQUEST");
    }
    else{
        locadoraService.find(req.params, {}, (result) => {
            if(result.data != null && result.data.length == 1){
                const removeLocadora = new Promise((resolve, reject) => {
                    try{
                        locadoraService.remove(req.params.id, (result) => {
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
                            idLocacao: result.data[0].id,
                            dateLocacao: result.data[0].dateLocacao
                        }
    
                        historyController.insert(data, (res) => {
                            if(res.statusCode == 201){
                                resolve(res);
                            }
                            else{
                                reject(res.error)
                            }
                        })
                    }
                    catch (err){
                        reject(err)
                    }                        
                });
    
                Promise.all([addHistory, removeLocadora]).then((values) => {
                    if(values[0].error || values[1].error) res.status(500).send({status: "Failed"})
                    else res.status(200).send({status:"success"})
                }).catch((err) => res.status(500).send({status: "Failed"}));
            }
            else{
                res.status(404).send({message: "could not found id"});
            }          
        });    
    }       
}

module.exports = {insert, find, update, remove, devolucao};