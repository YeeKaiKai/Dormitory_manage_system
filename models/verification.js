const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

/**
 * 
 * @param {*} token 
 * @returns reject(result{status: string, message: string}), resolve(decoded.data)
 */
module.exports = function(token) {
    let result = {};
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secret, (err, decoded) => {
            if(err) {
                result.status = "Failed!";
                result.message = "Token驗證失敗！";
                reject(result);
                return;
            } else {
                resolve(decoded.data);
                return;
            }
        })
    })
}