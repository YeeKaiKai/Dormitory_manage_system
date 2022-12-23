const connect = require("./connection_db.js");

module.exports = function announce(announcement) {
    let result = {};
    return new Promise((resolve, reject) => {
        connect.query(`INSERT INTO ANNOUNCEMENT(AnnounceContent) VALUES ?`, announcement.content, (err) => {
            if(err) {
                result.status = "Failed";
                result.message = "發布公告失敗！";
                reject(result);
                return;
            }
            result.status = "Success";
            result.message = "發布公告成功！";
            resolve(result);
            return;
        })
    })
}