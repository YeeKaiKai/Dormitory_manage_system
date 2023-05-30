const connect = require("../connection_db.js");

/**
 * view all the boarders
 * @returns 
 */
module.exports = function() {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `
        SELECT *
        FROM BOARDER
        LEFT JOIN STUDENT ON BOARDER.StuID = STUDENT.StuID
        LEFT JOIN USER ON STUDENT.StuID = USER.UID`;
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