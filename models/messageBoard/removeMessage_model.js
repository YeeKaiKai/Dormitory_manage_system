const connect = require("../connection_db.js");

/**
 * Delete the comment by student or housemaster
 * @param {{MNumber: string}} message 
 * @returns 
 */
module.exports = function(message) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`DELETE FROM MESSAGE WHERE MNumber = ?`, [message.MNumber], (err) => {
            if(err) {
                result.status = false;
                result.message = "刪除留言失敗！";
                reject(result);
                return;
            }
            result.status = true;
            result.message = "刪除留言成功！";
            resolve(result);
            return;
        })
    })
}