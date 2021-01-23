const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const db = require('../services/db.service');
const onlineModel = require('../models/online.model')(db.connectionDB());
const crypt = require('bcryptjs')

function verifyAuth(req, res, next){
    const token = req.headers['x-access-token'];

    if(token == null || token == undefined){
        res.status(401).send({message: "No token provided"})
    }
    else{
        jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
            if(err){
                res.status(401).send({auth: false, error: "Failed to authenticate Token"})
            } 
            else{
                db.find(onlineModel, {email: decoded.username}, {}, (result) => {
                    if(result.data.length == 1){
                        crypt.compare(result.data[0].token, decoded.hash, (err, result) => {
                            if(err) res.status(500).send({auth: false, error: "invalid hash"})
                            if(result) next()
                            else res.status(403).send({auth: result, error: "Forbidden"})
                        })
                    }
                    else{
                        res.status(403).send({error: "Forbidden"})
                    } 
                });
            }
        })
    }   
    
}

const generateJWT = (data, next) => {
    const token = jwt.sign(data, process.env.jwtSecret, {
        expiresIn: parseInt(process.env.jwtExpire )
    });

    next(token)
}

const getToken = (headerRequest) => {
    return headerRequest.headers['x-access-token'] ? headerRequest.headers['x-access-token'] : {};
}

module.exports = {verifyAuth, generateJWT, getToken}