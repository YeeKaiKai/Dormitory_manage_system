const connect = require("../connection_db.js");

/**
 * update the room which the boarder lives in
 * @param {{RoomNumber: string, StuID: string}} boarder 
 * @returns 
 */
module.exports = function(boarder) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `
        UPDATE BOARDER 
        SET RoomNumber = "${boarder.RoomNumber}"
        WHERE StuID = "${boarder.StuID}"`;
        connect.query(sql, (err) => {
            if(err) {
                result.status = "Failed!";
                result.message = "刪除住宿生資料失敗，伺服器錯誤！";
                reject(result);
                return;
            }
            result.status = "Success";
            result.message = "刪除住宿生資料成功！";
            resolve(result);
            return;
        })
    })
}