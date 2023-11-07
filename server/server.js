const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


// Initializes server connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
});

// Fetches all meets
app.get("/meets", (req, res) => {
    const q = "SELECT * FROM meets";
    db.query(q, (error, data) => {
        if (error) return res.json(error);
        return res.json(data);
    });
});

// Fetches a single meet
app.get("/meets/:meetId", (req, res) => {
    const meetId = req.params.meetId;
    const q = "SELECT * FROM meets WHERE id = ?";

    db.query(q, [meetId], (error, data) => {
        if (error) return res.json(error);
        return res.json(data);
    });
});

// Creates a meet
app.post("/meets", (req, res) => {
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
app.put("/meets/:meetId", (req, res) => {
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
app.delete("/meets/:id", (req, res) => {
    const meetId = req.params.id;
    const meets_q = "DELETE FROM meets WHERE id = ?";
    const events_q = "DELETE FROM events WHERE meet_id = ?";
    
    db.query(events_q, [meetId]);

    db.query(meets_q, [meetId], (error, data) => {
        if (error) return res.json(error);
        return res.json("Meet has been deleted");
    });
});


// TODO: Seperate meets/events functions into meets.js and events.js and call into server.js
// TODO: Install Higlight extension into vscode


// Fetches all events for a meet
app.get("/events", (req, res) => {
    const q = "SELECT * FROM events"
    db.query(q, (error, data) => {
        if (error) return res.json(error);
        return res.json(data);
    });
});

// Fetches a single event
app.get("/events/:eventId", (req, res) => {
    const eventId = req.params.eventId;
    // TODO: Check if event_id is the actual key for event id
    const q = "SELECT * FROM events WHERE event_id = ?";

    db.query(q, [eventId], (error, data) => {
        if (error) return res.json(error);
        return res.json(data);
    });
});

// Creates an event
app.post("/events", (req, res) => {
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

app.put("/events/:eventId", (req, res) => {
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

app.listen(5000, () => {
    console.log("Connected to backend");
});