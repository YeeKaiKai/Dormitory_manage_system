const connect = require("../connection_db");

/**
 * view all repairForm
 */

module.exports = function() {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM REPAIR_FORM`;
        connect.query(sql, (err, rows) => {
            if(err) {
                console.log(err);
                result.status = false;
                result.message = "所有維修資料查詢失敗!";
                reject(result);
                return;
            }

            result = JSON.stringify(rows);
            resolve(result);
            return;
        });
    })
}