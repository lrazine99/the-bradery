const mysql = require("mysql2");

/*
docker conf
{
host: "mysql_db",
user: "MYSQL_USER",
password: "MYSQL_PASSWORD",
database: "bradery",
} */

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "bradery",
  multipleStatements: false,
});

module.exports = db.promise();
