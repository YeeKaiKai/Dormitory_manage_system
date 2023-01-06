const connect = require("../connection_db.js");

/**
 * View all violation depending on StuID by housemaster 
 * @param {{StuID: string}} violation 
 * @returns 
 */
module.exports = function(violation) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `
        SELECT *
        FROM VIOLATION
        WHERE StuID = "${violation.StuID}"`;
        connect.query(sql, (err, rows) => {
            if(err) {
                result.status = "Failed!";
                result.message = "瀏覽違規紀錄失敗！";
                reject(result);
                return;
            }
            resolve(rows);
            return;
        })
    })
}