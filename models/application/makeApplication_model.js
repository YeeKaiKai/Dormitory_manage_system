const connect = require("../connection_db.js");
const paymentEmail = require("../payment_notice_email.js");

/**
 * Make the application by student
 * @param {{StuID: string, DName: string, ApplyAcademicYear: int, ApplySemester: char, AType: string, ARoomNumber: string, UType: string}} application 
 * @returns 
 */
module.exports = function(application) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql;
        if (application.AType === "申請住宿" || application.AType === "申請退宿") {
            sql = `INSERT INTO APPLICATION(DATE, StuID, DName, AType) VALUES((SELECT CONVERT_TZ(CURRENT_TIME(),'+00:00','+08:00')), "${application.StuID}", "${application.DName}", "${application.AType}")`;
        } else {
            sql = `INSERT INTO APPLICATION(DATE, StuID, DName, ARoomNumber, AType) VALUES((SELECT CONVERT_TZ(CURRENT_TIME(),'+00:00','+08:00')), "${application.StuID}", "${application.DName}", "${application.ARoomNumber}", "${application.AType}")`   
        }
        connect.query(sql, (err) => {
            if(err) {
                console.log(err);
                result.status = false;
                result.message = "申請失敗！";
                reject(result);
                return;
            }

            if(application.AType === "申請住宿"){
                paymentEmail(application.StuID, application.UType).then((result) => {
                    result.status = true;
                    result.message = "申請成功！";
                    resolve(result);
                    return;
    
                }).catch((err) => {
                    result = err;
                    reject(result);
                })  
            }

            result.status = true;
            result.message = "申請成功!";
            resolve(result);
            return;
        })
    }) 
}