const connect = require("../connection_db.js");

/**
 * Update the announcement content by house master
 * @param {{AnnounceTitle: string, AnnounceContent: string, AnnounceNumber: string}} announcement 
 * @returns 
 */
module.exports = function(announcement) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`UPDATE ANNOUNCEMENT SET AnnounceTitle = ?, AnnounceContent = ? WHERE AnnounceNumber = ?`, [announcement.AnnounceTitle, announcement.AnnounceContent, announcement.AnnounceNumber], (err) => {
            if(err) {
                result.status = false;
                result.message = "更改公告內容失敗！";
                reject(result);
                return;
            }
            result.status = true;
            result.message = "更改公告內容成功！";
            resolve(result);
            return;
        })
    })
}