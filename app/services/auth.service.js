const db = require('./db.service');
const userModel = require('../models/user.model')(db.connectionDB());
const crypt = require('bcryptjs')
const {generateJWT} = require('../utils/auth.utils');
const requestResponse = require('../utils/httpResponse.utils');
const onlineModel = require('../models/online.model')(db.connectionDB());
const response = require('../utils/httpResponse.utils');
const crypto = require('crypto');

const login = (data, next) => {
    db.find(userModel, {email: data["email"]}, {}, (result) => {
        if(result.data.length > 0){
            crypt.compare(data['password'] ,result.data[0].password, (err, res) => {
                if(err){
                    next(requestResponse(401, err, null));
                }
                else if(res){
                    const hash = crypto.randomBytes(Math.ceil(10 / 2)).toString('hex').slice(0, 10);
                   
                    generateJWT({username: result.data[0].username, hash: crypt.hashSync(hash)}, (token) => {
                        db.find(onlineModel, {email: result.data[0].username}, {}, (result) => {
                            const data = {token: hash, email: result.data[0].username }

                            if(result.data.length == 0){
                                db.insertMany(onlineModel, data, (result) => {
                                    if(result.statusCode == 201) next(requestResponse(200, null, {auth: true, jwt: token}));
                                    else next(requestResponse(500, null, "Could not set user as online"));
                                })
                            }
                            else if(result.data.length == 1){
                                db.update(onlineModel, result.data[0].id, data, (result) => {
                                    if(result && result.statusCode == 202) next(requestResponse(200, null, {auth: true, jwt: token}));
                                    else next(requestResponse(500, null, "Could not set user as online"));
                                });
                            }
                            else if(result.data.length > 1){
                                db.remove(onlineModel, {email: result.data[0].username}, (result) => {
                                    if(!result.error){
                                        db.insertMany(onlineModel, data, (result) => {
                                            if(result.statusCode == 201) next(requestResponse(200, null, {auth: true, jwt: token}));
                                            else next(requestResponse(500, null, "Could not set user as online"));
                                        })
                                    }
                                });
                            }
                        })
                        
                    })
                }       
                else{   
                    next(requestResponse(401, {message: "usuario e senha incorreto"}) );
                }         
            })
        }
        else{
            next(requestResponse(401, {message: "usuario e senha incorreto"}));
        }        
    })
}

const logout = (token, next) => {
    db.find(onlineModel, {token: token}, {}, (result) => {
        if(result.data.length == 1){
            db.remove(onlineModel, {id: result.data[0].id}, (result) => {
                if(result.statusCode == 203) next(response(200, null, {status: "logout"}));
                else next(response(404, "Could not find user online"));
            });
        } 
        else{
            next(response(404, "Could not find user online"));
        }
    })
}

module.exports = {login, logout}