require("dotenv").config();

let config = {
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  secret: process.env.SECRET
};

module.exports = config