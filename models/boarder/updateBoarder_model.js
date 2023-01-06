const connect = require("../connection_db.js");
const check = require("../../service/check.js");

/**
 * update the room which the boarder lives in
 * @param {{DName: string, RoomNumber: string, StuID: string}} boarder 
 * @returns 
 */
module.exports = function(boarder) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql;
        if(check.checkNull(boarder.DName) === false) {
            sql = `
            UPDATE BOARDER SET
            DName = "${boarder.DName}", RoomNumber = "${boarder.RoomNumber}"
            WHERE StuID = "${boarder.StuID}"`;
        } else {
            sql = `
            UPDATE BOARDER SET
            RoomNumber = "${boarder.RoomNumber}"
            WHERE StuID = "${boarder.StuID}"`;
        }
        connect.query(sql, (err) => {
            if(err) {
                result.status = false;
                result.message = "更新住宿生資料失敗，伺服器錯誤！";
                reject(result);
                return;
            }
            result.status = true;
            result.message = "更新住宿生資料成功！";
            resolve(result);
            return;
        })
    })
}