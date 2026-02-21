const express = require("express");
const mysql = require("mysql2");

const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
    db.query(
      "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50))"
    );
  }
});

app.get("/", (req, res) => {
  res.send("Two-Tier Node App Running 🚀");
});

app.get("/add", (req, res) => {
  db.query("INSERT INTO users (name) VALUES ('Omkar')", (err) => {
    if (err) throw err;
    res.send("User Added!");
  });
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
