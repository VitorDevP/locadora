
const authService = require('../services/auth.service');
const {getToken} = require('../utils/auth.utils');

const login = (req, res) => {
    if(req.body.email && req.body.password){
        authService.login(req.body, (result) => {
            res.status(result.statusCode).send(result.data ? result.data : result.error)
        });
    }    
}

const logout = (req, res) => {    
    authService.logout(getToken(req), (result) => {
        res.status(result.statusCode).send(result.data ? result.data : result.error)
    });
}

module.exports = {login, logout};