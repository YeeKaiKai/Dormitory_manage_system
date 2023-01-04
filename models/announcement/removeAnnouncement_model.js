const connect = require("../connection_db.js");

/**
 * Delete announcement by admin or housemaster
 * @param {{AnnounceNumber: string}} announcement 
 * @returns 
 */
module.exports = function(announcement) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`DELETE FROM ANNOUNCEMENT WHERE AnnounceNumber = ?`, announcement.AnnounceNumber, (err) => {
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