const connect = require("../connection_db.js");

/**
 * View all messages on message board
 * @returns 
 */
module.exports = function() {
    result = {};
    return new Promise((resolve, reject) => {
        connect.query(`SELECT MTitle, MContent, MNumber, UName FROM MESSAGE LEFT JOIN STUDENT USING(StuID) INNER JOIN USER ON STUDENT.StuID = USER.UID`, (err, rows) => {
            if(err) {
                console.log(err);
                result.status = false;
                result.message = "瀏覽留言板失敗！";
                reject(result);
                return;
            }
            resolve(rows);
            return;
        })
    })
}