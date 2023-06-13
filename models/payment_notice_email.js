const nodemailer = require("nodemailer");
const config = require("../config/config.js");
const connect = require("./connection_db.js");
const PDFDocument = require('pdfkit');
let imagePath = (__dirname+'/../routes/public/images/schoolLogo.png');

/**
 * send payment-notice email to students
 * UID is recipent ID , UType used to check if method called by admin
 * @param {UID: string } UID
 * @param {UType: string } UType
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
            
            /**
             * generate PDF file
             */
            let doc = new PDFDocument({margin: 50});
            let buffers = []; //used to receive data          
            let mailOptions = {};

            generateHeader(doc);
            generateCustomerInformation(doc, UID);
            generateFooter(doc);

            doc.on('data', buffers.push.bind(buffers));
            const fileName = `${UID}payment_notice.pdf`;

            doc.on('end', () => {
                let pdfData = Buffer.concat(buffers);
                mailOptions = {
                    from: config.email,
                    to: rows[0].Email,
                    subject: UType === "STUDENT" ? 
                            "宿舍費用繳費通知" :
                            "宿舍費用催繳通知",
                    text: UType === "STUDENT" ? 
                        "您好，已經收到您的住宿申請，請盡速繳費" :
                        "您好，請盡速繳費，否則申請將不予以受理",
                    attachments: [{
                        filename: fileName,
                        content: pdfData,
                        contentType: 'application/pdf'
                    }]
                };

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

            doc.end();
        })
    })
}

function generateHeader(doc) {
    doc.image(imagePath, 50, 45, {height:50, width: 50})
    .fontSize(20)
    .text("Dormitory Payment Notice", 110, 63)
    .fontSize(10)
    .text("NUK", 200, 100, {align: 'right'})
    .moveDown();
}

function generateFooter(doc) {
    doc.fontSize(10)
    .text('Please pay the fee quickly', 50, 730, {align: 'center', width: 500});
}

function generateCustomerInformation(doc, UID) {
    doc.text(`Studetn ID : ${UID}`, 50, 120)
        .text(`Date: ${formatDate(new Date())}`, 50, 132)
        .fontSize(20)
        .text(`fee: 9000`)
        .moveDown()
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const min = date.getMinutes();
    const second = date.getSeconds();

    return year+"/"+month+"/"+day+"  "+hour+":"+min+":"+second;
}

function generatePaymentPDF(doc, UID){
    generateHeader(doc);
    generateCustomerInformation(doc, UID);
    generateFooter(doc);
    return;
}