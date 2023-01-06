const connect = require("../connection_db.js");

/**
 * Update the comment content by student itself
 * @param {{MContent: string, MNumber: int}} message 
 * @returns 
 */
module.exports = function(message) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`UPDATE MESSAGE SET MContent = ? WHERE MNumber = ?`, [message.MContent, message.MNumber], (err) => {
            if(err) {
                result.status = false;
                result.message = "更改留言內容失敗！";
                reject(result);
                return;
            }
            result.status = true;
            result.message = "更改留言內容成功！";
            resolve(result);
            return;
        })
    })
}