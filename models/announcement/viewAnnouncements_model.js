const connect = require("../connection_db.js");

/**
 * View all the announcement by anyone
 * @returns 
 */
module.exports = function() {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = 'SELECT AnnounceTitle, AnnounceContent, AnnounceNumber, `DateTime`, UName FROM ANNOUNCEMENT AS A\
                    LEFT JOIN AAN_Manage AS AAN ON A.AnnounceNumber = AAN.AnnounceNumber\
                    LEFT JOIN HAN_Manage AS HAN ON A.AnnounceNumber = HAN.AnnounceNumber\
                    LEFT JOIN ADMIN  ON AAN.ASSN = ADMIN.ASSN\
                    LEFT JOIN HOUSEMASTER ON HAN.HSSN = HOUSEMASTER.HSSN\
                    LEFT JOIN USER ON ADMIN.ASSN = USER.UID OR HOUSEMASTER.HSSN = USER.UID;'
        connect.query(`SELECT * FROM ANNOUNCEMENT`, (err, rows) => {
            if(err) {
                result.status = false;
                result.message = "瀏覽公告失敗！";
                reject(result);
                return;
            }
            for(let i = 0; i < rows.length; i++) {
                let temp = JSON.stringify(rows[i]['DateTime']);
                rows[i]['DateTime'] = temp.replace('T', ' ').replace('.000Z', '');
            }
            let data = JSON.stringify(rows);
            resolve(data);
            return;
        })
    })
}