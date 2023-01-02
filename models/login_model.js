const connect = require("./connection_db.js");
const bcrypt = require('bcrypt');

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
            }
            bcrypt.compare(userData.UPassword, rows[0].UPassword).then((res, err) => {
                if(err) {
                    result.status = "Failed!";
                    result.message = "帳號密碼錯誤！";
                    reject(result);
                    return;
                }
            })
            result.UName = rows[0].UName;
            result.UID = rows[0].UID;
            result.UType = rows[0].UType;
            resolve(result);
            return;
        })
    })
}