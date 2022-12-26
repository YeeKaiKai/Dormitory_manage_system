const connect = require("../connection_db.js");

module.exports = function viewComment() {
    result = {};
    return new Promise((resolve, reject) => {
        connect.query(`SELECT MContent, SName FROM MESSAGE as M NATURAL JOIN STUDENT as S WHERE M.StuID = S.StuID`, (err, rows) => {
            if(err) {
                result.status = "Failed!";
                result.message = "溜覽留言板失敗！";
                reject(result);
                return;
            }
            resolve(rows);
            return;
        })
    })
}