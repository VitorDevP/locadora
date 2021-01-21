// const httpResponse = require('./httpResponse.utils');
var axios = require('axios')
const userModel = require('../models/user.model');
// const requestResponse = require('./httpResponse.utils');
const jwt = require('jsonwebtoken');

function verifyAuth(req, res, next){
    const token = req.headers['x-access-token'];

    if(token == null || token == undefined){
        res.status(401).send({message: "No authorized"})
    }
    else{
        axios.get(`${process.env.authServer}/${process.env.authApiVer}${process.env.authPath}`, 
        {headers: {
            'x-access-token': token
        }}).then(data => {
            if(!data){
                res.status(401).send({message: "No authorized"})   
            }   
            
            next()
        }).catch(err => {
            res.status(500).send({error: err})
        })
    }   
    
}

const generateJWT = (username, next) => {
    const token = jwt.sign({ id: username }, "secret", {
        expiresIn: 86400    // expires in 24 hours
    });

    next(token)
}

module.exports = {verifyAuth, generateJWT}