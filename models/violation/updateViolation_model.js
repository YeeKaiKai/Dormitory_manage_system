const connect = require("../connection_db.js");

/**
 * Update the violation content by housemaster
 * @param {{VContent: string, StuID: string, VNumber: int}} violation 
 * @returns 
 */
module.exports = function(violation) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`UPDATE VIOLATION SET VContent = ? WHERE StuID = ? AND VNumber = ?`, [violation.VContent, violation.StuID, violation.VNumber], (err) => {
            if(err) {
                result.status = false;
                result.message = "更新違規紀錄失敗！";
                reject(result);
                return;
            }
            result.status = true;
            result.message = "更新違規紀錄成功！";
            resolve(result);
            return;
        })
    })
}