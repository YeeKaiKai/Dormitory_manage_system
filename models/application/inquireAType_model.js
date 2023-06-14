const connect = require("../connection_db.js");

/**
 * Make the application by student
 * @param {{StuID: string, ApplyNumber: string}} application 
 * @returns 
 */
module.exports = function(application) {
    let result = {};
    return new Promise((resolve, reject) => {
        console.log(application);
        connect.query(`SELECT AType FROM APPLICATION WHERE StuID = ? AND ApplyNumber = ?`, [application.StuID, application.ApplyNumber], (err, rows) => {
            if(err) {
                console.log(err);
                result.status = false;
                result.message = "查詢申請類別失敗！";
                reject(result);
                return;
            }
            result.status = true;
            result.message = "查詢申請類別成功！";
            resolve(rows);
            return;
        })
    }) 
}