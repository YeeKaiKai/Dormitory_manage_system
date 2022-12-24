const connect = require("../connection_db.js");

/**
 * View all the announcement by anyone
 * @returns 
 */
module.exports = function viewAnnouncements() {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`SELECT * FROM ANNOUNCEMENT`, (err, rows) => {
            if(err) {
                result.status = "Failed";
                result.message = "瀏覽公告失敗！";
                reject(result);
                return;
            }
            resolve(rows);
            return;
        })
    })
}