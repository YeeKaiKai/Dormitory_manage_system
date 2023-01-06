const connect = require("./connection_db.js");
const bcrypt = require('bcrypt');
const check = require("../service/check.js");

/**
 * 
 * @param {{UID: string, UPassword: string}} userData 
 * @returns 
 */
module.exports = function(userData) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `
        SELECT *
        FROM USER AS U 
        LEFT JOIN STUDENT AS S on U.UID = S.StuID 
        LEFT JOIN HOUSEMASTER AS H ON U.UID = H.HSSN 
        LEFT JOIN ADMIN AS A ON U.UID = A.ASSN
        WHERE UID = "${userData.UID}"`;
        connect.query(sql, (err, rows) => {
            if(err) {
                result.status = "Failed!";
                result.message = "伺服器錯誤！";
                reject(result);
                return;
            } else if (check.checkNull(rows)) {
                result.status = "Failed!";
                result.message = "此用戶不存在！請確認帳號是否輸入正確。";
                reject(result);
                return;
            }
            bcrypt.compare(userData.UPassword, rows[0].UPassword).then((res) => {
                if(res === false) {
                    result.status = "Failed!";
                    result.message = "帳號密碼錯誤！";
                    reject(result);
                    return;
                } else {
                    result.UName = rows[0].UName;
                    result.UID = rows[0].UID;
                    result.UType = rows[0].UType;
                    resolve(result);
                    return;
                }
            })
        })
    })
}