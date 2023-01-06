const connect = require("../connection_db.js");

/**
 * 
 * @param {{DName: string, Fee: integer, DCapacity: integer}} dormitory 
 * @returns 
 */
module.exports = function(dormitory) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `
        INSERT INTO DORMITORY(DName, Fee, DCapacity)
        VALUES (?, ?, ?)`;
        connect.query(sql, [dormitory.DName, dormitory.Fee, dormitory.DCapacity], (err) => {
            if(err) {
                console.log(err);
                result.status = false;
                result.message = "新增宿舍失敗，伺服器錯誤！";
                reject(result);
                return;
            }
            result.status = true;
            result.message = "新增宿舍成功！";
            resolve(result);
            return;
        })
    })
}