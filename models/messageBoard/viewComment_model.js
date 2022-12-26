const connect = require("../connection_db.js");

module.exports = function() {
    result = {};
    return new Promise((resolve, reject) => {
        connect.query(`SELECT MContent, SName FROM MESSAGE NATURAL JOIN STUDENT`, (err, rows) => {
            if(err) {
                result.status = "Failed!";
                result.message = "瀏覽留言板失敗！";
                reject(result);
                return;
            }
            resolve(rows);
            return;
        })
    })
}