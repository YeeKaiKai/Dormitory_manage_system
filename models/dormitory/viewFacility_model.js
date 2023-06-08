const connect = require("../connection_db.js");
const check = require("../../service/check.js");

/**
 * 
 * @param {{DName: string, RoomNumber: string}} facility 
 * @returns 
 */
module.exports = function(facility) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `SELECT *
                   FROM FACILITY
                   WHERE DName="${facility.DName} AND RoomNumber="${facility.RoomNumber}"`;
        connect.query(sql , (err, rows) => {
            if(err) {
                result.status = false;
                result.message = "瀏覽設備資料失敗！";
                reject(result);
                return;
            }
            let data = JSON.stringify(rows);
            resolve(data);
            return;
        })
    })
}