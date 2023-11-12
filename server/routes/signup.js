const express = require("express");
const mysql = require("mysql");

const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

// TODO: Implement signup api
router.post("/", (req, res) => {
  const q = "INSERT INTO users (`username`, `email`, `password`, `create_time`) VALUES (?)";
    const values = [
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.create_time,
    ];

    db.query(q, [values], (error, data) => {
        if (error) return res.json(error);
        return res.json("User successfully added");
    });
});

module.exports = router;