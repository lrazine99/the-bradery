const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const app = express();

app.use(cors());
app.use(helmet());
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: "mysql_db",
  user: "MYSQL_USER",
  password: "MYSQL_PASSWORD",
  database: "bradery",
});

app.all("*", (req, res) => {
  res.status(404).send("Page introuvable");
});

app.get("/", (req, res) => {
  res.status(200).send("Bienvenue sur the bradery");
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server has started");
});
