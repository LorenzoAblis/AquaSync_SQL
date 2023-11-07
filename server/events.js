const express = require("express");
const mysql = require("mysql");

const router = express.Router;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
});

// Fetches all events for a meet
router.get("/events", (req, res) => {
    const q = "SELECT * FROM events"
    db.query(q, (error, data) => {
        if (error) return res.json(error);
        return res.json(data);
    });
});

// Fetches a single event
router.get("/events/:eventId", (req, res) => {
    const eventId = req.params.eventId;
    // TODO: Check if event_id is the actual key for event id
    const q = "SELECT * FROM events WHERE event_id = ?";

    db.query(q, [eventId], (error, data) => {
        if (error) return res.json(error);
        return res.json(data);
    });
});

// Creates an event
router.post("/events", (req, res) => {
    // meet_id is relational so event can only be created if meet_id exists in meets table
    const q = "INSERT INTO events (`meet_id`, `stroke`, `distance`, `time`) VALUES (?)";
    const values = [
        req.body.meet_id,
        req.body.stroke,
        req.body.distance,
        req.body.time,
    ];

    db.query(q, [values], (error, data) => {
        if (error) return res.json(error);
        return res.json("Meet successfully added");
    });
});

// TODO: Update an event

// app.put("/meets/:meetId", (req, res) => {
//     const meetId = req.params.meetId;
//     const q = "UPDATE meets SET `name` = ?, `location` = ?, `date` = ?, `opponent` = ? WHERE id = ?";
//     const values = [
//         req.body.name,
//         req.body.location,
//         req.body.date,
//         req.body.opponent,
//     ];
    
//     db.query(q, [...values, meetId], (error, data) => {
//         if (error) return res.json(error);
//         return res.json("Event");
//     });
// });

router.put("/events/:eventId", (req, res) => {
    const eventId = req.params.eventId;
    // TODO: Find the actual keys for the event table
    const q = "UPDATE events SET";
    const values = [
        req.body
    ];

    db.query(q, [...values, eventId], (error, data) => {
        if (error) return res.json(error);
        return res.json("Event has bee updated");
    });
});

// TODO: Delete an event



module.exports = router;