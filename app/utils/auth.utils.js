const jwt = require('jsonwebtoken');
const db = require('../services/db.service');
const onlineModel = require('../models/online.model')(db.connectionDB());
const crypt = require('bcryptjs')
const fs = require('fs')

function verifyAuth(req, res, next){
    const token = getToken(req);

    if(token == null || token == undefined){
        res.status(401).send({auth: false, message: "No token provided"})
    }
    else{
        jwtDecode(token, (err, decoded) => {
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
        });
    }       
}

const generateJWT = (data, next) => {
    fs.readFile(process.env.jwtSecret, 'utf8', (err, key) => {
        if(err){
            console.log("error: no private key for jwt")
            next();
        }
        else{
            const token = jwt.sign(data, key, {
                expiresIn: parseInt(process.env.jwtExpire),
                algorithm: "RS256"
            });

            next(token)
        }            
    });    
}

const getToken = (headerRequest) => {
    return headerRequest.headers['x-access-token'] ? headerRequest.headers['x-access-token'] : {};
}

function jwtDecode(token, next){
    fs.readFile(process.env.jwtPublic, 'utf8', (err, key) => {
        if(err){
            next(err)
        }
        else{
            jwt.verify(token, key, {algorithms: "RS256" }, (err, decoded) => {
                next(err, decoded)
            })
        }        
    });
}

module.exports = {verifyAuth, generateJWT, getToken, jwtDecode}