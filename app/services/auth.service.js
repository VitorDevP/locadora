const db = require('./db.service');
const userModel = require('../models/user.model')(db.connectionDB());
const crypt = require('bcryptjs')
const {generateJWT} = require('../utils/auth.utils');
const requestResponse = require('../utils/httpResponse.utils');

const login = (data, next) => {
    db.find(userModel, {email: data["email"]}, {}, (result) => {
        if(result.data){
            crypt.compare(data['password'] ,result.data[0].password, (err, res) => {
                if(err){
                    next(requestResponse(401, err, null));
                }
                else if(res){
                    generateJWT(result.data[0].username, (token) => {
                        next(requestResponse(200, null, {jwt: token}));
                    })
                }       
                else{
                    next(requestResponse(401, {message: "unathorized"}));
                }         
            })
        }
        else{
            next(result);
        }        
    })
}

module.exports = {login}