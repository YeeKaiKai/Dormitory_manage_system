const connect = require("../connection_db.js");
const addBoarder = require("../boarder/addBoarder_model.js");
const approvalEmail = require("../approval_email.js");

/**
 * update the status of application by house master.
 * If approving a application of application, it will send approval email to student
 * and assign a dormitory and room automatically
 * @param {{Approved: boolean, StuID: string, ApplyNumber: string, DName: string}} application 
 * @returns 
 */
module.exports = function(application) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`UPDATE APPLICATION SET Approved = ? WHERE StuID = ? AND ApplyNumber = ?`, [application.Approved, application.StuID, application.ApplyNumber], (err) => {
            if (err) {
                result.status = false;
                result.message = "更改申請審核失敗！";
                reject(result);
                return;
            }
            if(application.Approved === "已通過") {
                let boarder = {
                    StuID: application.StuID,
                    DName: application.DName
                };
                addBoarder(boarder).then((result) => {
                    let student = {
                        StuID: application.StuID
                    }
                    approvalEmail(student).then((result) => {
                        result.status = true;
                        result.message = "自動新增住宿學生成功！";
                        resolve(result);
                        return;
                    }).catch((err) => {
                        result.status = true;
                        result.message = "寄送Email失敗！";
                        resolve(result);
                        return;
                    }) 
                }).catch((err) => {
                    result.status = false;
                    result.message = "自動新增住宿學生失敗！";
                    reject(result);
                    return;
                })
            }
            result.status = true;
            result.message = "更改申請審核成功！";
            resolve(result);
            return;
        })
    })
}