
const authService = require('../services/auth.service');
const {getToken, jwtDecode} = require('../utils/auth.utils');

const login = (req, res) => {
    if(req.body.email && req.body.password){
        authService.login(req.body, (result) => {
            res.status(result.statusCode).send(result.data ? result.data : result.error)
        });
    }    
}

const logout = (req, res) => {    
    jwtDecode(getToken(req), (err, decoded) => {
        if(err){
             res.status(500).send({error: "Could not sign out"});
        }
        else {
            authService.logout(decoded.username, (result) => {
                res.status(result.statusCode).send(result.data ? result.data : result.error)
            });
        }
    })
    
}

module.exports = {login, logout};