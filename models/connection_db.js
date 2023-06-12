//tested

const mysql = require("mysql");
const config = require("../config/config.js");

/**
 * Create a Connection
 */
const connection = mysql.createConnection(
  {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    multipleStatements: true,
    timezone: "UTC"
  }
);

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
