//Tested

const connect = require("../connection_db.js");

/**
 * Add a violation by housemaster
 * @param {{VContent:string, VNumber:string, StuID:string}} violation 
 * @returns add result for reject() or resolve()
 */
module.exports = function(violation) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query('INSERT INTO VIOLATION(VContent, VNumber, StuID,  `DATE`) VALUES (?, ?, ?, ?)', [violation.VContent, violation.VNumber, violation.StuID, violation.DATE], (err) => {
            if(err) {
                console.log(err);
                result.status = false;
                result.message = "新增違規紀錄失敗！";
                reject(result);
                return;
            }
            result.status = true;
            result.message = "新增違規紀錄成功！";
            resolve(result);
            return;
        })
    })
}

