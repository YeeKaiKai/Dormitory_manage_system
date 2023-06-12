const connect = require("./connection_db.js");

/**
 * Update the user's password themselves
 * @param {{UID: string, UPassword: string}} user 
 * @returns 
 */
module.exports = function(user) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`UPDATE USER SET UPassword = ? WHERE UID = ?`, [user.UPassword, user.UID], (err) => {
            if(err) {
                console.log(err);
                result.status = false;
                result.message = "更新密碼失敗！";
                reject(result);
                return;
            }
            result.status = true;
            result.message = "更新密碼成功！";
            resolve(result);
            return;
        })
    })
}