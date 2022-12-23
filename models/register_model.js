//Tested

const connect = require("./connection_db.js");

/**
 * 
 * @param {StuID, SName, SPhoneNumber, SEmail, SDepartment, SSex} studentData 
 * @returns 
 */

module.exports = function regist(studentData) { 
  let result = {};
  return new Promise((resolve, reject) => {
    connect.query(`INSERT INTO STUDENT SET ?`, studentData, (err) => {
    if(err) {
      console.log(err);
      result.status = "Failed!";
      result.Message = "註冊失敗！";
      reject(result);
      return result;
    }
    console.log("REGISTER OK");
    result.stauts = "Success!";
    result.message = "註冊成功！";
    resolve(result);
    return result;
    })
  })
}