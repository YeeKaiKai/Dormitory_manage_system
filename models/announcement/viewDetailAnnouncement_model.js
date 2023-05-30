const connect = require("../connection_db.js");

/**
 * 
 * @param {{AnnounceNumber: string}} announcement 
 * @returns 
 */
module.exports = function(announcement) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = 'SELECT AnnounceTitle, AnnounceContent, AnnounceNumber, `DateTime`, UName FROM ANNOUNCEMENT AS A\
                    LEFT JOIN AAN_Manage AS AAN ON A.AnnounceNumber = AAN.AnnounceNumber\
                    LEFT JOIN HAN_Manage AS HAN ON A.AnnounceNumber = HAN.AnnounceNumber\
                    LEFT JOIN ADMIN  ON AAN.ASSN = ADMIN.ASSN\
                    LEFT JOIN HOUSEMASTER ON HAN.HSSN = HOUSEMASTER.HSSN\
                    LEFT JOIN USER ON ADMIN.ASSN = USER.UID OR HOUSEMASTER.HSSN = USER.UID\
                    WHERE AnnounceNumber = ?'
        connect.query(`SELECT * FROM ANNOUNCEMENT WHERE AnnounceNumber = ?`, announcement.AnnounceNumber, (err, rows) => {
            if(err) {
                result.status = false;
                result.message = "瀏覽公告失敗！";
                reject(result);
                return;
            }
            let data = JSON.stringify(rows)
            resolve(data);
            return;
        })
    })
}