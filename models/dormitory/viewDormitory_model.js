const connect = require("../connection_db.js");
const check = require("../../service/check.js");

/**
 * 
 * @param {{}} dormitory 
 * @returns 
 */
module.exports = function(dormitory) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `SELECT *
                   FROM DORMITORY`;
        connect.query(sql , (err, rows) => {
            if(err) {
                result.status = false;
                result.message = "瀏覽宿舍資料失敗！";
                reject(result);
                return;
            }
            let data = JSON.stringify(rows);
            resolve(data);
            return;
        })
    })
}