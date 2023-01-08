const connect = require("../connection_db.js");

/**
 * Inquire the status of the application by student
 * @param {{StuID: string}} inquiry 
 * @returns 
 */
module.exports = function(inquiry) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query('\
        SELECT A.StuID, ApplyNumber, ApplyAcademicYear, ApplySemester, `DATE`, Approved, Paid, UName\
        FROM APPLICATION AS A\
        LEFT JOIN STUDENT AS S ON A.StuID = S.StuID\
        LEFT JOIN USER AS U ON S.StuID = U.UID\
        WHERE A.StuID = ?', inquiry.StuID, (err, rows) => {
            if(err) {
                result.status = false;
                result.message = "查詢申請紀錄失敗！";
                reject(result);
                return;
            }
            data = JSON.stringify(rows);
            resolve(data);
            return;
        })
    })
}