const connect = require("../connection_db.js");

/**
 * view all the application by admin
 */
module.exports = function() {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = '\
        SELECT A.StuID, ApplyNumber, ApplyAcademicYear, ApplySemester, `DATE`, Approved, Paid, UName\
        FROM APPLICATION AS A\
        LEFT JOIN STUDENT AS S ON A.StuID = S.StuID\
        LEFT JOIN USER AS U ON S.StuID = U.UID';
        connect.query(sql, (err, rows) => {
            if(err) {
                result.status = false
                result.message = "查看申請紀錄失敗，伺服器錯誤！";
                reject(result);
                return;
            }
            data = JSON.stringify(rows);
            resolve(data);
            return;
        })
    }) 
}