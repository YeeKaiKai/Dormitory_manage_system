const mysql = require("mysql");
const config = require("./config.js");

/**
 * create a pool that provides at most 5 connections.
 */
let pool = mysql.createPool(config);

pool.getConnection((err, connection) => {
  if (err) {
    throw err;
  }

  console.log("Connected to the MYSQL server.");
  let sql = `INSERT INTO ANNOUNCEMENT(AnnounceNumber, AnnounceContent) VALUES(?, ?)`;
  let number = 1;
  let content = "嗨嗨";
  connection.query(sql, number, content, (err) => {
    if(err) {
      throw err;
    }
  });

})



/* pool.end(function(err) {
  if(err) {
    throw err;
  }
  console.log("Disconnect.")
}) */
