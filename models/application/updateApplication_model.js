const connect = require("../connection_db.js");
const addBoarder = require("../boarder/addBoarder_model.js");
const approvalEmail = require("../approval_email.js");
const inquireAType = require("./inquireAType_model.js");
const removeBoarder = require("../boarder/removeBoarder_model.js");
const updateBoarder = require("../boarder/updateBoarder_model.js");

/**
 * update the status of application by house master.
 * If approving a application of application, it will send approval email to student
 * and assign a dormitory and room automatically
 * @param {{Approved: string, Paid: string, StuID: string, ApplyNumber: string, DName: string}} application 
 * @returns 
 */
module.exports = function(application) {
    let result = {};
    return new Promise((resolve, reject) => {
        let AType;
        inquireAType(application).then((rows) => {
            AType = rows[0].AType;
        }).catch((err) => {
            reject(err);
            return;
        })
        let sql;
        if (AType === "申請住宿") {
            sql = `UPDATE APPLICATION SET Approved = "${application.Approved}", Paid = "${application.Paid}" WHERE StuID = "${application.StuID}" AND ApplyNumber = "${application.ApplyNumber}"`;
        } else {
            sql = `UPDATE APPLICATION SET Approved = "${application.Approved}" WHERE StuID = "${application.StuID}" AND ApplyNumber = "${application.ApplyNumber}"`;
        }
        connect.query(sql, (err) => {
            if (err) {
                result.status = false;
                result.message = "更改申請審核失敗！";
                reject(result);
                return;
            }
            if(application.Approved === "已通過") {
                if (AType === "申請住宿") {
                    let boarder = {
                        StuID: application.StuID,
                        DName: application.DName
                    };
                    addBoarder(boarder).then((result) => {
                        console.log("111");
                        let student = {
                            StuID: application.StuID
                        }
                        approvalEmail(student).then((result) => {
                            result.status = true;
                            result.message = "寄送email成功！";
                            resolve(result);
                            return;
                        }).catch((err) => {
                            result.status = true;
                            result.message = "寄送Email失敗！";
                            resolve(result);
                            return;
                        }) 
                    }).catch((err) => {
                        console.log(err);
                        result.status = false;
                        result.message = "自動新增住宿學生失敗！";
                        reject(result);
                        return;
                    })
                } else if (AType === "申請退宿") {
                    let boarder = {
                        StuID: application.StuID,
                    };
                    removeBoarder(boarder).then((result) => {
                        let student = {
                            StuID: application.StuID
                        }
                        approvalEmail(student).then((result) => {
                            result.status = true;
                            result.message = "寄送email成功！";
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
                        result.message = "自動刪除住宿學生失敗！";
                        reject(result);
                        return;
                    })
                } else if (AType === "申請換宿") {
                    console.log(application);
                    updateBoarder(application).then((result) => {
                        let student = {
                            StuID: application.StuID
                        }
                        approvalEmail(student).then((result) => {
                            result.status = true;
                            result.message = "寄送email成功！";
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
                        result.message = "自動變更住宿學生失敗！";
                        reject(result);
                        return;
                    })
                }
            }
            result.status = true;
            result.message = "更改申請審核成功！";
            resolve(result);
            return;
        })
    })
}