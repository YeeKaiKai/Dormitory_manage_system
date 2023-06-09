const { Module } = require("module");
const connect = require("../connection_db.js");

/**
 * View personal RepairForm
 */

module.exports = function(UID) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM REPAIR_FORM WHERE UID = ?`;
        connect.query(sql, UID, (err, rows) => {
            if(err) {
                console.log(err);
                result.status = false;
                result.message = "個人資料查詢失敗";
                reject(result);
                return;
            }

            console.log(rows);
            result = JSON.stringify(rows);
            resolve(result);
            return;
        })
    })
}