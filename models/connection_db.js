//tested

const mysql = require("mysql");
const config = require("../config/config.js");

/**
 * Create a Connection
 */
const connection = mysql.createConnection(config);

/**
 * Get connect
 */
connection.connect((err) => {
  if (err) {
    throw err;
  } 
  console.log("Connected to the MYSQL server.");
})

module.exports = connection;

/* pool.end(function(err) {
  if(err) {
    throw err;
  }
  console.log("Disconnect.")
}) */
