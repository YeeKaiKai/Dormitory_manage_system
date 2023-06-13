const nodemailer = require("nodemailer");
const config = require("../config/config.js");
const connect = require("./connection_db.js");

/**
 * send payment-notice email to students
 * UID is recipent ID , UType used to check if method called by admin
 * @param {UID: string } UID
 * @param {UType: string} UType
 * @return 
 */

module.exports = function(UID, UType) {
    return new Promise((resovle, reject) => {
        let result = {};
        let sql = `
            SELECT Email 
            FROM USER
            WHERE UID = "${UID}"`;
        connect.query(sql, (err, rows) => {
            if(err) {
                result.status = false;
                result.message = "查詢Email失敗";
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
                    accessToken: config.access_token
                }
            })

            let mailOptions = {
                from: config.email,
                to: rows[0].Email,
                subject: UType === "STUDENT" ? 
                        "宿舍費用繳費通知" :
                        "宿舍費用催繳通知",
                text: UType === "STUDENT" ? 
                    "您好，已經收到您的住宿申請，請盡速繳費" :
                    "您好，請盡速繳費，否則申請將不予以受理"

            }

            transporter.sendMail(mailOptions, (err, info) => {
                if(err) {
                    console.log(err);

                    result.status = false;
                    result.message = "發送繳費通知email失敗，伺服器錯誤!";
                    reject(result);
                    return;
                } 

                result.status = true;
                result.message = "發送繳費通知成功"
                resovle(result);
                console.log('Email sent: ' + info.response);
            })
        })
    })
}