const connect = require("../connection_db.js");

/**
 * View all violation by housemaster 
 * @returns 
 */
module.exports = function() {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `
        SELECT *
        FROM VIOLATION`;
        connect.query(sql, (err, rows) => {
            if(err) {
                result.status = false;
                result.message = "瀏覽違規紀錄失敗！";
                reject(result);
                return;
            }
            let temp = JSON.stringify(rows[0]['DATE']);
            rows[0]['DATE'] = temp.replace('T', ' ').replace('.000Z', '');
            data = JSON.stringify(rows);
            resolve(data);
            return;
        })
    })
}