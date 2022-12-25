const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

/**
 * 
 * @param {*} token 
 * @returns reject(result{status: string, message: string}), resolve(decoded.data)
 */
module.exports = function verify(token) {
    let result = {};
    let time = Math.floor(Date.now() / 1000);
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secret, (err, decoded) => {
            if(err) {
                result.status = "Failed!";
                result.message = "Token驗證失敗！";
                reject(result);
                return;
            } else if (decoded.exp < time) {
                result.status = "Failed!";
                result.message = "Token過期！";
                reject(result);
                return;
            } else {
                resolve(decoded.data);
                return;
            }
        })
    })
}