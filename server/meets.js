const express = require("express");
const mysql = require("mysql");

const router = express.Router();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
});

// Fetches all meets
router.get("/meets", (req, res) => {
    const q = "SELECT * FROM meets";
    db.query(q, (error, data) => {
        if (error) return res.json(error);
        return res.json(data);
    });
});

// Fetches a single meet
router.get("/meets/:meetId", (req, res) => {
    const meetId = req.params.meetId;
    const q = "SELECT * FROM meets WHERE id = ?";

    db.query(q, [meetId], (error, data) => {
        if (error) return res.json(error);
        return res.json(data);
    });
});

// Creates a meet
router.post("/meets", (req, res) => {
    const q = "INSERT INTO meets (`name`,`location`, `date`, `opponent`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.location,
        req.body.date,
        req.body.opponent,
    ];

    db.query(q, [values], (error, data) => {
        if (error) return res.json(error);
        return res.json("Meet successfully added");
    });
});

// Updates a meet
router.put("/meets/:meetId", (req, res) => {
    const meetId = req.params.meetId;
    const q = "UPDATE meets SET `name` = ?, `location` = ?, `date` = ?, `opponent` = ? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.location,
        req.body.date,
        req.body.opponent,
    ];
    
    db.query(q, [...values, meetId], (error, data) => {
        if (error) return res.json(error);
        return res.json("Meet has been updated");
    });
});

// Delete a meet
router.delete("/meets/:id", (req, res) => {
    const meetId = req.params.id;
    const meets_q = "DELETE FROM meets WHERE id = ?";
    const events_q = "DELETE FROM events WHERE meet_id = ?";
    
    db.query(events_q, [meetId]);

    db.query(meets_q, [meetId], (error, data) => {
        if (error) return res.json(error);
        return res.json("Meet has been deleted");
    });
});

module.exports = router;