const connect = require("../connection_db.js");

/**
 * view the boarder's own information
 * @param {{StuID: string}} boarder
 * @returns 
 */
module.exports = function(boarder) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `
        SELECT UName, StuID, DName, RoomNumber
        FROM BOARDER
        LEFT JOIN USER
        ON BOARDER.StuID = USER.UID
        WHERE StuID = "${boarder.StuID}"`;
        connect.query(sql, (err, rows) => {
            if(err) {
                result.status = false;
                result.message = "瀏覽住宿生資料失敗！";
                reject(result);
                return;
            }
            let data = JSON.stringify(rows);
            resolve(data);
            return;
        })
    })
}