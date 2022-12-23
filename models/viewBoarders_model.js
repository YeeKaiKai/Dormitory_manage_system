const connect = require("./connection_db.js");

module.exports = function viewBoarders() {
    let result = {};
    return new Promise((resolve, reject) =>
        connect.query(`SELECT * FROM STUDENT AS S RIGHT JOIN BOARDER AS B WHERE S.StuID = B.StuID ORDER BY B.RoomNumber ASC`, (err, rows) => {
            if(err) {
                result.status = "Failed";
                result.message = "瀏覽住宿生資料失敗！";
                reject(result);
                return;
            }
            resolve(rows);
            return;
        })
    )
}