const connect = require("../connection_db.js");

/**
 * View all violation by housemaster 
 * @returns 
 */
module.exports = function() {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `
        SELECT *
        FROM VIOLATION`;
        connect.query(sql, (err, rows) => {
            if(err) {
                result.status = false;
                result.message = "瀏覽違規紀錄失敗！";
                reject(result);
                return;
            }
            console.log(rows);
            data = JSON.stringify(rows);
            resolve(data);
            return;
        })
    })
}