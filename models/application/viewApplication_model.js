const connect = require("../connection_db.js");

/**
 * view all the application by admin
 */
module.exports = function() {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `
        SELECT *
        FROM APPLICATION`;
        connect.query(sql, (err, rows) => {
            if(err) {
                result.status = "Failed!"
                result.message = "查看申請紀錄失敗，伺服器錯誤！";
                reject(result);
                return;
            }
            resolve(rows);
            return;
        })
    }) 
}