const connect = require("../connection_db.js");
const check = require("../../service/check.js");

/**
 * 
 * @param {{DName: string, newDName: string, Fee: integer, DCapacity: integer}} dormitory 
 */
module.exports = function(dormitory) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `UPDATE DORMITORY SET`;
        // judge if there's a need to add a comma between sets
        let status = false;
        if(check.checkNull(dormitory.newDName) === false) {
            if(status) {
                let comma = `,`;
                sql = sql + comma;
            }
            let _sql = ` DName = "${dormitory.newDName}"`;
            sql = sql + _sql;
            status = true;
        }
        if(check.checkNull(dormitory.Fee) === false) {
            if(status) {
                let comma = `,`;
                sql = sql + comma;
            }
            let _sql = ` Fee = "${dormitory.Fee}"`;
            sql = sql + _sql;
            status = true;
        }
        if(check.checkNull(dormitory.DCapacity) === false) {
            if(status) {
                let comma = `,`;
                sql = sql + comma;
            }
            let _sql = ` DCapacity = "${dormitory.DCapacity}"`;
            sql = sql + _sql;
            status = true;
        }
        let where = ` WHERE DName = "${dormitory.DName}"`
        sql = sql + where;
        connect.query(sql, (err) => {
            if(err) {
                result.status = false;
                result.message = "更新宿舍資料失敗，伺服器錯誤！";
                reject(result);
                return;
            }
            result.status = true;
            result.message = "更新宿舍資料成功！";
            resolve(result);
            return;
        })
    })
}