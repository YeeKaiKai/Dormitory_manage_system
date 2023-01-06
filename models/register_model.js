//Tested

const connect = require("./connection_db.js");

/**
 * User Regist
 * @param {{UName: string, UID: string, UPassword: string, UType: string}} UserData 
 * @returns 
 */

module.exports = function(UserData) { 
  let result = {};
  return new Promise((resolve, reject) => {
    connect.query(`INSERT INTO USER SET ?`, UserData, (err) => {
    if(err) {
      console.log(err);
      result.status = false;
      result.Message = "註冊失敗！";
      reject(result);
      return;
    }
    result.stauts = true;
    result.message = "註冊成功！";
    resolve(result);
    return;
    })
  })
}