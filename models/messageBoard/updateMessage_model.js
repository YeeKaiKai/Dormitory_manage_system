const connect = require("../connection_db.js");

/**
 * 
 * @param {{MContent: string, StuID: string, MNumber: int}} message 
 * @returns 
 */
module.exports = function(message) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`UPDATE MESSAGE SET MContent = ? WHERE StuID = ? AND MNumber = ?`, [message.MContent, message.StuID, message.MNumber], (err) => {
            if(err) {
                result.status = "Failed!";
                result.message = "更改留言內容失敗！";
                reject(result);
                return;
            }
            result.status = "Success!";
            result.message = "更改留言內容成功！";
            resolve(result);
            return;
        })
    })
}