const { resolveObjectURL } = require('buffer');
const connect = require('../connection_db.js');

/**
 * Update RepairForm
 * @param {{UID: String, UType}} identity 
 * @param {{RepairNumber: string, RStatus: String, Reply: string, 
 *          FName: String, RoomNumber: String, DName: String, 
 *          ASSN: String, RContent: String, Freetime: String
 *          Confirm: String}} newRepairForm
 * @return
 */

module.exports = function(identity, newRepairForm) {
    return new Promise((resolve, reject) => {
        let result = {};

        const UID = identity.UID;
        const UType = identity.UType;

        const RepairNumber = newRepairForm.RepairNumber;
        const RStatus = newRepairForm.RStatus;
        const DName = newRepairForm.DName;
        const RoomNumber = newRepairForm.RoomNumber;
        const FName = newRepairForm.FName;
        const Freetime = newRepairForm.Freetime;
        const RContent = newRepairForm.RContent;
        const Reply = newRepairForm.Reply;
        
       if(RStatus) {
            if(UType !== "ADMIN") {
                result.status = "false";
                result.message = "權限不符!";
                reject(result);
                return;
            }

            let sql = `UPDATE REPAIR_FORM SET RStatus = ?,ASSN = ? WHERE RepairNumber = ?`;
            connect.query(sql, [RStatus, UID, RepairNumber], (err, rows) => {
               if(err) {
                    console.log(err);
                    result.status = "false";
                    result.message = "報修狀態更新失敗!";
                    reject(result);
                    return;
                }
           })
        }

        if(Reply) {
            if (UType !== "ADMIN") {
                result.status = "false" ;
                result.message = "權限不符!";
                reject(result);
                return;
            }
            let sql = `UPDATE REPAIR_FORM SET Reply = ? WHERE RepairNumber = ?`;    
            connect.query(sql, [Reply, RepairNumber], (err, rows) => {
                if(err) {
                    console.log(err);
                    result.status = "false";
                    result.message = "回復更新失敗!";
                    reject(result);
                    return;
                }
            });
        }

        if(DName) {
            let sql = `UPDATE REPAIR_FORM SET DName = ? WHERE RepairNumber = ?`;
            connect.query(sql, [Reply, RepairNumber], (err, rows) => {
                if(err) {
                    console.log(err);
                    result.status = "false";
                    result.message = "宿舍更新失敗!";
                    reject(result);
                    return;
                }
            })
        }

        if(RoomNumber) {
            let sql = `UPDATE REPAIR_FROM SET RoomNumber = ? WHERE RepairNumber = ?`
            connect.query(sql, [RoomNumber, RepairNumber], (err, rows) => {
                if(err) {
                   console.log(err) ;
                   result.status = "false";
                   result.message = "房號更新失敗!";
                   reject(result);
                   return;
                }
            })
        }

        if(FName) {
            let sql = `UPDATE REPAIR_FROM SET FName = ? WHERE RepairNumber = ?`
            connect.query(sql, [FName, RepairNumber], (err, rows) => {
                if(err) {
                   console.log(err) ;
                   result.status = "false";
                   result.message = "設備名稱更新失敗!";
                   reject(result);
                   return;
                }
            })
        }

        if(Freetime) {
            let sql = `UPDATE REPAIR_FORM SET Freetime = ? WHERE RepairNumber = ?`
            connect.query(sql, [Freetime, RepairNumber], (err, rows) => {
                if(err) {
                   console.log(err) ;
                   result.status = "false";
                   result.message = "方便時間更新失敗!";
                   reject(result);
                   return;
                }
            })
        }

        if(RContent) {
            let sql = `UPDATE REPAIR_FORM SET RContent = ? WHERE RepairNumber = ?`;
            connect.query(sql, [RContent, RepairNumber], (err, rows) => {
                if(err) {
                    console.log(err);
                    result.status = "false";
                    result.message = "報修內容更新失敗!";
                    reject(result);
                    return;
                }
            })
        }

        result.status = true;
        result.message = "更新成功";
        resolve(result);
        return;
    })
}