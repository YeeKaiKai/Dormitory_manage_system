const connect = require("../connection_db.js");
const paymentEmail = require("../payment_notice_email.js");

/**
 * Make the application by student
 * @param {{StuID: string, DName: string, ApplyAcademicYear: int, ApplySemester: char}} application 
 * @returns 
 */
module.exports = function(application) {
    let result = {};
    return new Promise((resolve, reject) => {
        console.log(application);
        connect.query(`INSERT INTO APPLICATION(DATE, StuID, DName) VALUES((SELECT CONVERT_TZ(CURRENT_TIME(),'+00:00','+08:00')), ?, ?)`, [application.StuID, application.DName], (err) => {
            if(err) {
                console.log(err);
                result.status = false;
                result.message = "申請失敗！";
                reject(result);
                return;
            }

            paymentEmail(application.StuID).then((result) => {
                result.status = true;
                result.message = "申請成功！";

            }).catch((err) => {
                result = err;
            })
            
            result.status = true;
            result.message = "申請成功!";
            resolve(result);
            return;

        })
    }) 
}