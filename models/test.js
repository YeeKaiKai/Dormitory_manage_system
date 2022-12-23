const connect = require("./connection_db.js");

let testData = {
    VContent: "test",
    VNumber: "3",
    StuID: "2"
}

function addViolation(violation) {
    let result = {};
    connect.query(`INSERT INTO VIOLATION SET ?`, violation, (err) => {
        if(err) {
            result.status = "Failed!";
            result.message = "新增違規紀錄失敗！";
            throw err;
        }
        result.status = "Success!";
        result.message = "新增違規紀錄成功！";
        console.log("true");
        return;
    })
}

addViolation(testData);