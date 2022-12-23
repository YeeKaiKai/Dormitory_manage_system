const connect = require("./connection_db.js");

module.exports = function addViolation(violation) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`INSERT INTO VIOLATION(VContent, VNumber, StuID) VALUES (?, ?, ?)`, [violation.VContent, violation.VNumber, violation.StuID], (err) => {
            if(err) {
                result.status = "Failed!";
                result.message = "新增違規紀錄失敗！";
                reject(result);
                return;
            }
            result.status = "Success!";
            result.message = "新增違規紀錄成功！";
            resolve(result);
            return;
        })
    })
}

