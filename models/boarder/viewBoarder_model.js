const connect = require("../connection_db.js");

/**
 * view all the boarders
 * @returns 
 */
module.exports = function() {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `
        SELECT *
        FROM BOARDER`;
        connect.query(sql, (err, rows) => {
            if(err) {
                result.status = "Failed!";
                result.message = "瀏覽住宿生資料失敗！";
                reject(result);
                return;
            }
            resolve(rows);
            return;
        })
    })
}