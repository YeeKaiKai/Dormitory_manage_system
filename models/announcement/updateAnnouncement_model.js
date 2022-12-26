const connect = require("../connection_db.js");

/**
 * Update the announcement content by house master
 * @param {{AnnounceContent: string, AnnounceNumber: string}} announcement 
 * @returns 
 */
module.exports = function(announcement) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`UPDATE ANNOUNCEMENT SET AnnounceContent = ? WHERE AnnounceNumber = ?`, [announcement.AnnounceContent, announcement.AnnounceNumber], (err) => {
            result.status = "Failed!";
            result.message = "更改公告內容失敗！";
            reject(result);
            return;
        })
        result.status = "Success!";
        result.message = "更改公告內容成功！";
        resolve(result);
        return;
    })
}