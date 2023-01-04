const connect = require("../connection_db.js");
const check = require("../../service/check.js");

/**
 * 
 * @param {{DName: string, RoomNumber: string, newRoomNumber: string, RCapacity: integer}} room 
 * @returns 
 */
module.exports = function(room) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `UPDATE ROOM SET`;
        // judge if there's a need to add a comma between sets
        let status = false;
        if(check.checkNull(room.newRoomNumber) === false) {
            if(status == true) {
                let comma = `,`;
                sql = sql + comma;
            }            
            let _sql = ` RoomNumber = "${room.newRoomNumber}"`;
            sql = sql + _sql;
            status = true;
        }
        if(check.checkNull(room.RCapacity) === false) {
            if(status == true) {
                let comma = `,`;
                sql = sql + comma;
            }
            let _sql = ` RCapacity = "${room.RCapacity}"`;
            sql = sql + _sql;
            status = true;
        }
        let where = ` WHERE DName = "${room.DName}" AND RoomNumber = "${room.RoomNumber}"`;
        sql = sql + where;
        connect.query(sql, (err) => {
            if(err) {
                result.status = "Falied!";
                result.message = "更新房間資料失敗，伺服器錯誤！";
                reject(result);
                return;
            }
            result.status = "Failed!";
            result.message = "更新房間資料成功！";
            resolve(result);
            return;
        })
    })
}