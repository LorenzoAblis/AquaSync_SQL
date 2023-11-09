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
router.get("/", (req, res) => {
    const q = "SELECT * FROM meets";
    db.query(q, (error, data) => {
        if (error) return res.json(error);
        return res.json(data);
    });
});

// Fetches a single meet
router.get("/:meetId", (req, res) => {
    const meetId = req.params.meetId;
    const q = "SELECT * FROM meets WHERE meet_id = ?";

    db.query(q, [meetId], (error, data) => {
        if (error) return res.json(error);
        return res.json(data);
    });
});

// Creates a meet
router.post("/", (req, res) => {
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
router.put("/:meetId", (req, res) => {
    const meetId = req.params.meetId;
    const q = "UPDATE meets SET `name` = ?, `location` = ?, `date` = ?, `opponent` = ? WHERE meet_id = ?";
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
router.delete("/:meetId", (req, res) => {
    const meetId = req.params.meetId;
    const meets_q = "DELETE FROM meets WHERE meet_id = ?";
    const events_q = "DELETE FROM events WHERE meet_id = ?";
    
    db.query(events_q, [meetId], (eventsError, eventsData) => {
        if (eventsError) return res.json(eventsError);
        db.query(meets_q, [meetId], (meetsError, meetsData) => {
            if (meetsError) return res.json(meetsError);
            
            return res.json("Meet deleted");
            })
    });
})

module.exports = router;