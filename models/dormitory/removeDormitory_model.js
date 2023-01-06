const connect = require("../connection_db.js");

/**
 * 
 * @param {{DName: string}} dormitory 
 */
module.exports = function(dormitory) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM DORMITORY WHERE DName = "${dormitory.DName}"`;
        connect.query(sql, (err) => {
            if(err) {
                result.status = false;
                result.message = "刪除宿舍資料失敗，伺服器錯誤！";
                reject(result);
                return;
            }
            result.status = true;
            result.message = "刪除宿舍資料成功！";
            resolve(result);
            return;
        })
    })
}