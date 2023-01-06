const connect = require("../connection_db.js");

/**
 * 
 * @param {{DName: string, RoomNumber: string, RCapacity: integer}} room 
 * @returns 
 */
module.exports = function(room) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `
        INSERT ROOM(DName, RoomNumber, RCapacity)
        VALUES (?, ?, ?)`;
        connect.query(sql, [room.DName, room.RoomNumber, room.RCapacity], (err) => {
            console.log(err);
            if(err) {
                result.status = false;
                result.message = "新增房間失敗，伺服器錯誤！";
                reject(result);
                return;
            }
            result.status = true;
            result.message = "新增房間成功！";
            resolve(result);
            return;
        })
    })
}