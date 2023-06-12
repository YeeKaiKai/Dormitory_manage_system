const nodemailer = require("nodemailer");
const config = require("../config/config.js");
const connect = require("./connection_db.js");

/**
 * send email to students after their application for dormitory is approved
 * @param {{StuID: string}} student 
 * @returns 
 */
module.exports = function(student) {
    return new Promise((resolve, reject) => {
        let sql = `
            SELECT Email
            FROM USER
            WHERE UID = "${student.StuID}"`;
        connect.query(sql, (err, rows) => {
            if(err) {
                result.status = false;
                result.message = "查詢Email失敗！";
                reject(result);
                return;
            }
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    type: "OAuth2",
                    user: config.email,
                    clientId: config.client_ID,
                    clientSecret: config.client_secret,
                    refreshToken: config.refresh_token,
                    accessToken: config.access_token,
                }
            });
            let mailOptions = {
                from: config.EMAIL,
                to: rows[0].Email,
                subject: "宿舍申請審核通過通知",
                text: '您好，您申請本校的住宿已通過審核，請至國立高雄大學學生住宿系統登入後查詢您的住宿棟別及房間，謝謝。'
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    let result = {
                        status: false,
                        message: "發送審核通過email失敗，伺服器錯誤！"
                    }
                    console.log(error);
                    reject(result);
                    return
                } else {
                    let result = {
                        status: false,
                        message: "發送審核通過email成功！"
                    }
                    console.log('Email sent: ' + info.response);
                }
            })
        })
    })
}