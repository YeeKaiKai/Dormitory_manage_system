const connect = require("../connection_db.js");

/**
 * 
 * @param {{DName: string, RoomNumber: string, RCapacity: string}} room 
 * @returns 
 */
module.exports = function(room) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `
        INSERT ROOM(DName, RoomNumber, RCapacity)
        VALUES ?`;
        connect.query(sql, room, (err) => {
            if(err) {
                result.status = "Failed!";
                result.message = "新增房間失敗，伺服器錯誤！";
                reject(result);
                return;
            }
            result.status = "Success!";
            result.message = "新增房間成功！";
            resolve(result);
            return;
        })
    })
}