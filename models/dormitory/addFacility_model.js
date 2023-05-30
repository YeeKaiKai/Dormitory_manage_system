const connect = require("../connection_db.js");

/**
 * 
 * @param {{DName: string, RoomNumber: string, FName: string, FQuantity: integer}} facility 
 * @returns 
 */
module.exports = function(facility) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `
        INSERT FACILITY(DName, RoomNumber, FName, FQuantity)
        VALUES ("${facility.DName}", "${facility.RoomNumber}", "${facility.FName}", ${facility.FQuantity})`;
        connect.query(sql, (err) => {
            if(err) {
                result.status = false;
                result.message = "新增設備失敗，伺服器錯誤！";
                reject(result);
                return;
            }
            result.status = true;
            result.message = "新增設備成功！";
            resolve(result);
            return;
        })
    })
}