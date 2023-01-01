const connect = require("../connection_db.js");

/**
 * 
 * @param {{StuID: string, VNumber: string}} violation 
 * @returns 
 */
module.exports = function(violation) {
    let result = {};
    return Promise((resolve, reject) => {
        let sql = `
        DELETE FROM VIOLATION
        WHERE StuID = "${violation.StuID} AND VNumber = "${violation.VNumber}"`;
        connect.query(sql, (err) => {
            if(err) {
                result.status = "Failed!";
                result.message = "刪除違規紀錄失敗！";
                reject(result);
                return;
            }
            result.status = "Success!";
            result.message = "刪除違規紀錄成功！";
            resolve(result);
            return;
        })
    })
}