const connect = require("./connection_db.js");

/**
 * 
 * @param {{HAccount: string, HPassword: string}} housemasterData 
 * @returns 
 */
module.exports = function(housemasterData) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`SELECT * FROM STUDENT WHERE HAccount = "${housemasterData.SAccount}" AND HPassword = "${housemasterData.SPassword}"`, (err, rows) => {
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