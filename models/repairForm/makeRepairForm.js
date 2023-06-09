const connect = require("../connection_db.js");

/**
 * Make the RepairForm by student
 * @param {{UID: String, FName: CharacterData, RoomNumber: CharacterData, DName: CharacterData, RepairMsg: CharacterData}}
 * @returns
 */

module.exports = function(repairForm) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`INSERT INTO REPAIR_FORM(UID, FName, RoomNumber, DName, RepairMsg) VALUES(?, ?, ?, ?, ?)`, [repairForm.UID, repairForm.FName, repairForm.RoomNumber, repairForm.DName, repairForm.RepairMsg], (err) => {
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