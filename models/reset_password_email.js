const nodemailer = require("nodemailer");
const config = require("../config/config.js");
const connect = require("./connection_db.js");

/**
 * send email to students after their application for dormitory is approved
 * @param {UID: string, resetUrl: url} 
 * @returns 
 */
module.exports = function(UID, resetUrl) {
    return new Promise((resolve, reject) => {
        let result = {};
        let sql = `
            SELECT Email
            FROM USER
            WHERE UID = "${UID}"`;
        connect.query(sql, (err, rows) => {
            if(err) {
                console.log(err);
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
            let message = `您好，依據您提出的忘記密碼請求，請點選以下網址 ${resetUrl} 來變更密碼，謝謝。`
            let mailOptions = {
                from: config.EMAIL,
                to: rows[0].Email,
                subject: "國立高雄大學學生住宿系統 - 密碼變更網址",
                text: message
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    let result = {
                        status: false,
                        message: "發送變更密碼email失敗，伺服器錯誤！"
                    }
                    console.log(error);
                    reject(result);
                    return;
                } else {
                    let result = {
                        status: false,
                        message: "發送變更密碼email成功！"
                    }
                    console.log('Email sent: ' + info.response);
                    resolve(result);
                    return;
                }
            })
        })
    })
}