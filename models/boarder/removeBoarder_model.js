const connect = require("../connection_db.js");

/**
 * remove boarder by admin
 * @param {{StuID: string}} boarder 
 * @returns 
 */
module.exports = function(boarder) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `
        DELETE FROM BOARDER
        WHERE StuID = "${boarder.StuID}"`;
        connect.query(sql, (err) => {
            if(err) {
                result.status = false;
                result.message = "刪除住宿生資料失敗，伺服器錯誤！";
                reject(result);
                return;
            }
            result.status = true;
            result.message = "刪除住宿生資料成功！";
            resolve(result);
            return;
        })
    })
}