const connect = require("../connection_db.js");
const addBoarder = require("../boarder/addBoarder_model.js");

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
                result.status = false;
                result.message = "更改申請審核失敗！";
                reject(result);
                return;
            }
            if(application.Approved === "已通過") {
                addBoarder(application);
            }
            result.status = true;
            result.message = "更改申請審核成功！";
            resolve(result);
            return;
        })
    })
}