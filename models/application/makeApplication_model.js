const connect = require("../connection_db.js");

/**
 * Make the application by student
 * @param {{StuID: string, DName: string, ApplyAcademicYear: int, ApplySemester: char}} application 
 * @returns 
 */
module.exports = function makeapplication(application) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`INSERT INTO APPLICATION(StuID, DName, ApplyAcademicYear, ApplySemester) VALUES(?, ?, ?, ?)`, [application.StuID, application.DName, application.ApplyAcademicYear, application.ApplySemester], (err) => {
            if(err) {
                result.status = "Failed!";
                result.message = "申請失敗！";
                reject(result);
                return;
            }
            result.status = "Success!";
            result.message = "申請成功！";
            resolve(result);
            return;
        })
    }) 
}