const connect = require("../connection_db.js");

/**
 * Add new boarder by admin, this is called only when a application is approved
 * @param {{StuID: string, DName: string}} boarder 
 * @returns 
 */
module.exports = function(boarder) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql = `
        INSERT INTO BOARDER(StuID, RoomNumber, DName) (SELECT "${boarder.StuID}", ROOM.RoomNumber, "${boarder.DName}"
        FROM ROOM 
        LEFT JOIN BOARDER
        ON ROOM.RoomNumber = BOARDER.RoomNumber 
        AND ROOM.DName = BOARDER.DName
        WHERE ROOM.DName = "${boarder.DName}"
        GROUP BY ROOM.RoomNumber, ROOM.DName
        HAVING COUNT(StuID) < 4
        ORDER BY RAND()
        LIMIT 1)`
        connect.query(sql, [boarder.StuID, boarder.DName, boarder.RoomNumber], (err) => {
            if(err) {
                console.log(err);
                result.status = false;
                result.message = "新增住宿生資料失敗，伺服器錯誤！";
                reject(result);
                return;
            }
            result.status = true;
            result.message = "新增住宿生資料成功！";
            resolve(result);
            return;
        })
    })
}