const connect = require("../connection_db.js");

/**
 * Add a announcement by system manager
 * @param {{AnnounceTitle: string, AnnounceContent: string, SSN: string, UType: string}} announcement 
 * @returns 
 */
module.exports = function(announcement) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql;
        switch(announcement.UType) {
            case 'ADMIN':
                sql = `
                INSERT INTO ANNOUNCEMENT(AnnounceTitle, AnnounceContent) 
                VALUES("${announcement.AnnounceTitle}", "${announcement.AnnounceContent}");
                INSERT INTO AAN_Manage(AnnounceNumber, ASSN)
                VALUES((SELECT MAX(AnnounceNumber) FROM ANNOUNCEMENT), "${announcement.SSN}")`;
                break;
            case 'HOUSEMASTER':
                sql = `
                INSERT INTO ANNOUNCEMENT(AnnounceTitle, AnnounceContent) 
                VALUES("${announcement.AnnounceTitle}", "${announcement.AnnounceContent}");
                INSERT INTO HAN_Manage(AnnounceNumber, HSSN)
                VALUES((SELECT MAX(AnnounceNumber) FROM ANNOUNCEMENT), "${announcement.SSN}")`;
                break;
        }
        connect.query(sql, (err) => {
            if(err) {
                console.log(err);
                result.status = false;
                result.message = "發布公告失敗！";
                reject(result);
                return;
            }
            result.status = true;
            result.message = "發布公告成功！";
            resolve(result);
            return;
        })
    })
}