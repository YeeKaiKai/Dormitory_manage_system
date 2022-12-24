const connect = require("../connection_db.js");

/**
 * Inquire the status of the application by student
 * @param {{StuID: string}} inquiry 
 * @returns 
 */
module.exports = function inquireApplication(inquiry) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`SELECT * FROM APPLICATION WHERE StuID = ?`, inquiry.StuID, (err, rows) => {
            if(err) {
                result.status = "Failed!";
                result.message = "查詢申請紀錄失敗！";
                reject(result);
                return;
            }
            resolve(rows);
            return;
        })
    })
}