const connect = require("./connection_db.js");

/**
 * 
 * @param {SAccount, SPassword} studentData 
 * @returns 
 */
module.exports = function login(studentData) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`SELECT * FROM STUDENT WHERE SAccount = "${studentData.SAccount}" AND SPassword = "${studentData.SPassword}"`, (err, rows) => {
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