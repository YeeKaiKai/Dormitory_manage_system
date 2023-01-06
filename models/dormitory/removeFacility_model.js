const connect = require("../connection_db.js");

/**
 * 
 * @param {{DName: string, RoomNumber: string, FName: string}} facility 
 */
module.exports = function(facility) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM FACILITY WHERE DName = "${facility.DName}" AND RoomNumber = "${facility.RoomNumber}" AND FName = "${facility.FName}" `;
        connect.query(sql, (err) => {
            if(err) {
                console.log(err);
                result.status = false;
                result.message = "刪除設備資料失敗，伺服器錯誤！";
                reject(result);
                return;
            }
            result.status = true;
            result.message = "刪除設備資料成功！";
            resolve(result);
            return;
        })
    })
}