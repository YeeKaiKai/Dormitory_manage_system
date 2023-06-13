const connect = require("../connection_db.js");

/**
 * 
 * @param {string} AType 
 * @returns 
 */
module.exports = function(AType) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `
        SELECT A.StuID, ApplyNumber, ApplyAcademicYear, ApplySemester, DATE, Approved, Paid, UName, DName, AType, ARoomNumber
        FROM APPLICATION AS A
        LEFT JOIN STUDENT AS S ON A.StuID = S.StuID
        LEFT JOIN USER AS U ON S.StuID = U.UID
        WHERE AType = "${AType}"`;
        connect.query(sql, (err, rows) => {
            if(err) {
                console.log(err);
                result.status = false
                result.message = "查看申請紀錄失敗，伺服器錯誤！";
                reject(result);
                return;
            }
            for(let i = 0; i < rows.length; i++) {
                let temp = JSON.stringify(rows[i]['DATE']);
                rows[i]['DATE'] = temp.replace('T', ' ').replace('.000Z', '');
            }
            let data = JSON.stringify(rows);
            resolve(data);
            return;
        })
    }) 
}