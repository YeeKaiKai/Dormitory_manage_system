const e = require("express");
const connect = require("../connection_db.js");

/**
 * Inquire the status of the application by student
 * @param {{StuID: string}} inquiry 
 * @returns 
 */
module.exports = function(inquiry) {
    return new Promise((resolve, reject) => {
        console.log(inquiry.StuID);
        connect.query('\
        SELECT A.StuID, ApplyNumber, ApplyAcademicYear, ApplySemester, `DATE`, Approved, Paid, UName, DName\
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
            if(rows.length === 0) { // not apply yet
                let sql = `
                SELECT SSex, UName, StuID
                FROM STUDENT AS S
                LEFT JOIN USER AS U ON S.StuID = U.UID
                WHERE StuID = ?`;
                connect.query(sql, [inquiry.StuID], (err, rows) => {
                    if(err) {
                        result.status = false;
                        result.message = "查詢申請紀錄失敗！";
                        reject(result);
                        return;
                    }
                    let data = JSON.stringify(rows);
                    resolve(data);
                    return;
                })
            } else {
                for(let i = 0; i < rows.length; i++) {
                    let temp = JSON.stringify(rows[i]['DateTime']);
                    rows[i]['DateTime'] = temp.replace('T', ' ').replace('.000Z', '');
                }
                let data = JSON.stringify(rows);
                resolve(data);
                return;
            }
        })
    })
}