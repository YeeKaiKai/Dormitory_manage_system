const connect = require("../connection_db.js");

/**
 * Delete a violation by house master
 * @param {{StuID: string, VNumber: string}} violation 
 * @returns delete result for reject() or resolve()
 */
module.exports = function(violation) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`DELETE FROM VIOLATION WHERE StuID = ? AND VNumber = ?`, [violation.StuID, violation.VNumber], (err) => {
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