const connect = require("../connection_db.js");

/**
 * Make the RepairForm by student
 * @param {{UID: String, DName: String, RoomNumber: String, FName: String, Freetime: String, RContent: String}}
 * @returns
 */

module.exports = function(repairForm) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`INSERT INTO REPAIR_FORM(UID, DName, RoomNumber, FName, Freetime, RContent) VALUES(?, ?, ?, ?, ?, ?)`, [repairForm.UID, repairForm.DName, repairForm.RoomNumber, repairForm.FName, repairForm.Freetime,repairForm.RContent], (err) => {
            if(err){
                console.log(err);
                result.status = false;
                result.message = "報修申請失敗!";
                reject(result);
                return;
            }
            result.status = true;
            result.message = "申請成功!";
            resolve(result);
            return;
        })
    })
}