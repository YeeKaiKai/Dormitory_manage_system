const connect = require("../connection_db.js");

/**
 * 
 * @param {{DName: string, RoomNumber: string}} room 
 */
module.exports = function(room) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM ROOM WHERE DName = "${room.DName}" AND RoomNumber = "${room.RoomNumber}"`;
        connect.query(sql, (err) => {
            if(err) {
                result.status = false;
                result.message = "刪除房間資料失敗，伺服器錯誤！";
                reject(result);
                return;
            }
            result.status = true;
            result.message = "刪除房間資料成功！";
            resolve(result);
            return;
        })
    })
}