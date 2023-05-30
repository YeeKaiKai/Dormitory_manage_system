const connect = require("../connection_db.js");
const check = require("../../service/check.js");

/**
 * 
 * @param {{DName: string, RoomNumber: string, FName: string, newFName: string, FQuantity: integer}} facility 
 */
module.exports = function(facility) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `UPDATE FACILITY SET`;
        // judge if there's a need to add a comma between sets
        let status = false;
        if(check.checkNull(facility.newFName) === false) {
            let _sql = ` FName = "${facility.newFName}"`;
            sql = sql + _sql;
            status = true;
        }
        if(check.checkNull(facility.FQuantity) === false) {
            if(status) {
                let comma = `,`;
                sql = sql + comma;
            }
            let _sql = ` FQuantity = ${facility.FQuantity}`;
            sql = sql + _sql;
        }
        let where = ` WHERE DName = "${facility.DName}" AND RoomNumber = "${facility.RoomNumber}" AND FName = "${facility.FName}"`;
        sql = sql + where
        connect.query(sql, (err) => {
            if(err) {
                result.status = false;
                result.message = "更改設備資料失敗，伺服器錯誤！";
                reject(result);
                return;
            }
            result.status = true;
            result.message = "更新設備資料成功！";
            resolve(result);
            return;
        })
    })
}