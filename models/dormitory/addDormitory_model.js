const connect = require("../connection_db.js");

/**
 * 
 * @param {{DName: string, Fee: integer, DCapacity: string}} dormitory 
 * @returns 
 */
module.exports = function(dormitory) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `
        INSERT INTO DORMITORY(DName, Fee, DCapacity)
        VALUES ?`;
        connect.query(sql, dormitory, (err) => {
            if(err) {
                result.status = "Failed!";
                result.message = "新增宿舍失敗，伺服器錯誤！";
                reject(result);
                return;
            }
            result.status = "Success!";
            result.message = "新增宿舍成功！";
            resolve(result);
            return;
        })
    })
}