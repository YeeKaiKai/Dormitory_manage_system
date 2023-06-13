// const connect = require("./connection_db.js");
const PDFDocument = require("pdfkit");
const fs = require("fs");
let imagePath = (__dirname+'/../routes/public/images/schoolLogo.png');

function generateHeader(doc) {
    doc.image(imagePath, 50, 45, { height:50 ,width: 50})
    .fontSize(20)
    .text("Dormitory Payment notice", 110, 63)
    .fontSize(10)
    .text("NUK", 200, 100, { align: 'right'})
    .moveDown();
}  

function generateFooter(doc) {
    doc.fontSize(10)
    .text('Please pay the fee quickly',50, 730 ,{align: 'center', width: 500});
}

function createPayment(payment, path) {

    let doc = new PDFDocument({margin: 50});

    generateHeader(doc);
    generateFooter(doc);

    doc.pipe(fs.createWriteStream('./testfile.pdf'));

    doc.end();
}

function generateCustomerInformation(doc) {
    doc.text(`Student ID : A1095556`, 50, 120)
        .text(`Date: ${formatDate(new Date())}`, 50, 132)
        .fontSize(20)
        .text(`Fee: $9000`)
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

let doc = new PDFDocument({margin: 50});
generateHeader(doc)
generateCustomerInformation(doc)
generateFooter(doc)
doc.pipe(fs.createWriteStream('./testfile.pdf'));
doc.end();