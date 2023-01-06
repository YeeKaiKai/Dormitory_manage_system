const connect = require("../connection_db.js");

/**
 * update the status of application by house master
 * @param {{Approved: boolean, StuID: string, ApplyNumber: string}} application 
 * @returns 
 */
module.exports = function(application) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`UPDATE APPLICATION SET Approved = ? WHERE StuID = ? AND ApplyNumber = ?`, [application.Approved, application.StuID, application.ApplyNumber], (err) => {
            if (err) {
                result.status = "Failed!";
                result.message = "更改申請審核失敗！";
                reject(result);
                return;
            }
            result.status = "Success!";
            result.message = "更改申請審核成功！";
            resolve(result);
            return;
        })
    })
}