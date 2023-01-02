const connect = require("../connection_db.js");

/**
 * Delete announcement by admin or housemaster
 * @param {{ANumber: string}} announcement 
 * @returns 
 */
module.exports = function(announcement) {
    result = {};
    return Promise((resolve, reject) => {
        connect.query(`DELETE FROM ANNOUNCEMENT WHERE ANumber = ?`, announcement.ANumber, (err) => {
            if(err) {
                result.status = "Failed!";
                result.message = "刪除公告失敗!";
                reject(result);
                return;
            }
            result.status = "Success!";
            result.message = "刪除公告成功!";
            resolve(result);
            return;
        })
    })
}