
const authService = require('../services/auth.service');

const login = (data, next) => {
    if(data['email'] && data['password']){
        authService.login(data, (result) => {
            next(result)
        })
    }
    
}

module.exports = {login};