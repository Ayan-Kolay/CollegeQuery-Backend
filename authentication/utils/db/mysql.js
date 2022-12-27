const mysql = require("mysql2/promise");

const {db} = require("./../../config/config");
// console.log(db);

const pool = mysql.createPool({
  host: db.host,
  port: db.port,
  user: db.user,
  password: db.password,
  database: db.database,
  waitForConnections: db.waitForConnections,
  connectionLimit: db.connectionLimit,
  queueLimit: db.queueLimit,
});


module.exports = pool;