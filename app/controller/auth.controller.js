
const authService = require('../services/auth.service');

const login = (data, next) => {
    if(data['email'] && data['password']){
        authService.login(data, (result) => {
            next(result)
        });
    }    
}

const logout = (token, next) => {
    authService.logout(token, (result) => {
        next(result);
    });
}

module.exports = {login, logout};