const mysql = require("mysql2");

const db = mysql.createPool({
  host: "mysql_db",
  user: "root",
  password: "MYSQL_ROOT_PASSWORD",
  database: "bradery",
  multipleStatements: false,
});

module.exports = db.promise();
