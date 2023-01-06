const connect = require("../connection_db.js");
const check = require("../../service/check.js");

/**
 * 
 * @param {{DName: string, RoomNumber: string, FName: string}} dormitory 
 * @returns 
 */
module.exports = function(dormitory) {
    let result = {};
    return new Promise((resolve, reject) => {
        let sql;
        // check if the inquiry has input
        if(check.checkNull(dormitory.DName) === true) { // check all dormitory
            sql = `
            SELECT * 
            FROM DORMITORY
            NATURAL JOIN ROOM
            NATURAL JOIN FACILITY`;
        } else if (check.checkNull(dormitory.RoomNumber) === true) { // check all rooms in a dormitory
            sql = `
            SELECT * 
            FROM DORMITORY
            NATURAL JOIN ROOM
            NATURAL JOIN FACILITY
            WHERE DName = "${dormitory.DName}"`;
        } else if (check.checkNull(dormitory.FName) === true){ // check all facilities in a room

            sql = `
            SELECT * 
            FROM ROOM
            NATURAL JOIN FACILITY
            WHERE DName = "${dormitory.DName}" AND RoomNumber = "${dormitory.RoomNumber}"`;
        } else { // check a facility in a room
            sql = `
            SELECT *
            FROM FACILITY
            WHERE DName = "${dormitory.DName}" AND RoomNumber = "${dormitory.RoomNumber}" AND FName = "${dormitory.FName}"`;
        }
        connect.query(sql , (err, rows) => {
            if(err) {
                result.status = "Failed!";
                result.message = "瀏覽宿舍資料失敗！";
                reject(result);
                return;
            }
            resolve(rows);
            return;
        })
    })
}