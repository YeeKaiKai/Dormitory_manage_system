const connect = require("../connection_db.js");

/**
 * Add a announcement by system manager
 * @param {{AnnounceContent: string, SSN: string, UType: string}} announcement 
 * @returns 
 */
module.exports = function(announcement) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql;
        switch(announcement.UType) {
            case 'ADMIN':
                sql = `
                INSERT INTO ANNOUNCEMENT(AnnounceContent) 
                VALUES("${announcement.AnnounceContent}");
                INSERT INTO ANN_Manage(AnnounceNumber, ASSN)
                VALUES((SELECT MAX(AnnounceNumber) FROM ANNOUNCEMENT), "${announcement.SSN}")`;
            case 'HOUSEMASTER':
                sql = `
                INSERT INTO ANNOUNCEMENT(AnnounceContent) 
                VALUES("${announcement.AnnounceContent}");
                INSERT INTO HAN_Manage(AnnounceNumber, HSSN)
                VALUES((SELECT MAX(AnnounceNumber) FROM ANNOUNCEMENT), "${announcement.SSN}")`;
        }
        connect.query(sql, (err) => {
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