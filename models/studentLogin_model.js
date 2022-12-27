const connect = require("./connection_db.js");

/**
 * 
 * @param {{SAccount: string, SPassword: string}} studentData 
 * @returns 
 */
module.exports = function(studentData) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`SELECT * FROM STUDENT WHERE StuID = "${studentData.SAccount}" AND SName = "${studentData.SPassword}"`, (err, rows) => {
            if(err) {
                result.status = "Failed!";
                result.message = "登入失敗！";
                reject(result);
                return;
            }
            resolve(rows);
            return;
        })
    })
}