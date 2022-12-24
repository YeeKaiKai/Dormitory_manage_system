const connect = require("../connection_db.js");

/**
 * Delete the comment by house master
 * @param {{MNumber: string}} comment 
 * @returns 
 */
module.exports = function deleteComment(comment) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`DELETE FROM MESSAGE WHERE MNumber = ?`, comment.MNumber, (err) => {
            if(err) {
                result.status = "Failed!";
                result.message = "刪除留言失敗！";
                reject(result);
                return;
            }
            result.status = "Success!";
            result.message = "刪除留言成功！";
            resolve(result);
            return;
        })
    })
}