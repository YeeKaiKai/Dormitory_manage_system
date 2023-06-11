const connect = require("../connection_db.js");

/**
 * View all violation depending on StuID by student 
 * @param {{StuID: string}} violation 
 * @returns 
 */
module.exports = function(violation) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `
        SELECT *
        FROM VIOLATION
        WHERE StuID = "${violation.StuID}"`;
        connect.query(sql, (err, rows) => {
            if(err) {
                result.status = false;
                result.message = "瀏覽違規紀錄失敗！";
                reject(result);
                return;
            }
            let temp = JSON.stringify(rows[0]['DATE']);
            rows[0]['DATE'] = temp.replace('T', ' ').replace('.000Z', '');
            let data = JSON.stringify(rows);
            resolve(data);
            return;
        })
    })
}