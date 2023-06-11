const connect = require("../connection_db.js");

/**
 * Leave a comment by student
 * @param {{MContent: string, StuID: string}} message 
 * @returns comment result for resolve() or reject()
 */
module.exports = function(message) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`INSERT INTO MESSAGE(DateTime, MTitle, MContent, StuID) VALUES ((SELECT CONVERT_TZ(CURRENT_TIME(),'+00:00','+08:00')), ?, ?, ?)`, [message.MTitle, message.MContent, message.StuID], (err) => {
            if(err) {
                console.log(err);
                result.status = false;
                result.message = "留言失敗！";
                reject(result);
                return;
            }
            result.status = true;
            result.message = "留言成功！";
            resolve(result);
            return;
        })
    })
}