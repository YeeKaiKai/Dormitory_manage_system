const connect = require("../connection_db.js");
const check = require("../../service/check.js");

/**
 * 
 * @param {{DName: string}} room 
 * @returns 
 */
module.exports = function(room) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `SELECT *
                   FROM ROOM
                   WHERE DName="${room.DName}"`;
        connect.query(sql , (err, rows) => {
            if(err) {
                result.status = false;
                result.message = "瀏覽房間資料失敗！";
                reject(result);
                return;
            }
            console.log(sql);
            let data = JSON.stringify(rows);
            resolve(data);
            return;
        })
    })
}