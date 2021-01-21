// const httpResponse = require('./httpResponse.utils');
var axios = require('axios')
const userModel = require('../models/user.model');
// const requestResponse = require('./httpResponse.utils');
const jwt = require('jsonwebtoken');
const db = require('../services/db.service');
const onlineModel = require('../models/online.model')(db.connectionDB());

function verifyAuth(req, res, next){
    const token = req.headers['x-access-token'];

    if(token == null || token == undefined){
        res.status(401).send({message: "No authorized"})
    }
    else{
        db.find(onlineModel, {token: token}, {}, (result) => {
            if(result.data.length == 1) next();
            else res.status(403).send({error: "Forbidden"})
        })
        // axios.get(`${process.env.authServer}/${process.env.authApiVer}${process.env.authPath}`, 
        // {headers: {
        //     'x-access-token': token
        // }}).then(data => {
        //     if(!data){
        //         res.status(401).send({message: "No authorized"})   
        //     }   
            
        //     next()
        // }).catch(err => {
        //     res.status(500).send({error: err})
        // })
    }   
    
}

const generateJWT = (username, next) => {
    const token = jwt.sign({ id: username }, "secret", {
        expiresIn: 86400    // expires in 24 hours
    });

    next(token)
}

const getToken = (headerRequest) => {
    return headerRequest.headers['x-access-token'] ? headerRequest.headers['x-access-token'] : {};
}

module.exports = {verifyAuth, generateJWT, getToken}