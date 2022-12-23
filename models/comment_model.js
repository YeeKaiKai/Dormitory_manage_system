const connect = require("./connection_db.js");

module.exports = function comment(message) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`INSERT INTO MESSAGE(MContent, StuID) VALUES SET ?`, message.content, (err) => {
            if(err) {
                result.status = "Failed!";
                result.message = "留言失敗！";
                reject(result);
                return;
            }
            result.status = "Success!";
            result.message = "留言成功！";
            resolve(result);
            return;
        })
    })
}