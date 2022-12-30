const connect = require("./connection_db.js");

/**
 * 
 * @param {{UID: string, UPassword: string}} userData 
 * @returns 
 */
module.exports = function(userData) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `
        SELECT UName, UType
        FROM USER AS U 
        LEFT JOIN STUDENT AS S on U.UID = S.StuID 
        LEFT JOIN HOUSEMASTER AS H ON U.UID = H.HSSN 
        LEFT JOIN ADMIN AS A ON U.UID = A.ASSN
        WHERE UID = "${userData.UID}" AND UPassword = "${userData.UPassword}"`;
        connect.query(sql, (err, rows) => {
            if(err) {
                result.status = "Failed!";
                result.message = "登入失敗！";
                console.log(err);
                reject(result);
                return;
            }
            resolve(rows);
            return;
        })
    })
}