const express = require("express")
const mysql = require("mysql")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors());


// Initialize server connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
})

//TODO: Fetch all events for a meet

// Fetch all meets
app.get("/meets", (req, res) => {
    const q = "SELECT * FROM meets"
    db.query(q, (error, data) => {
        if (error) return res.json(error)
        return res.json(data)
    })
})

// Fetch a single meet
app.get('/meets/:meetId', (req, res) => {
    const meetId = req.params.meetId;
    const q = "SELECT * FROM meets WHERE id = ?";

    db.query(q, [meetId], (error, data) => {
        if (error) return res.json(error)
        return res.json(data)
    })
})

// TODO: Fetch a single event

// Create a meet
app.post("/meets", (req, res) => {
    const q = "INSERT INTO meets (`name`,`location`, `date`, `opponent`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.location,
        req.body.date,
        req.body.opponent,
    ]

    db.query(q, [values], (error, data) => {
        if (error) return res.json(error)
        return res.json("Meet successfully added")
    })
})

// Create an event
// TODO: meet_id is relational so event can only be created if meet_id exists in meets table
app.post("/events", (req, res) => {
    const q = "INSERT INTO events (`meet_id`, `stroke`, `distance`, `time`) VALUES (?)"
    const values = [
        req.body.meet_id,
        req.body.stroke,
        req.body.distance,
        req.body.time,
    ]

    db.query(q, [values], (error, data) => {
        if (error) return res.json(error)
        return res.json("Meet successfully added")
    })
})

// Update a meet
app.put("/meets/:meetId", (req, res) => {
    const meetId = req.params.meetId;
    const q = "UPDATE meets SET `name` = ?, `location` = ?, `date` = ?, `opponent` = ? WHERE id = ?";

    const values = [
        req.body.name,
        req.body.location,
        req.body.date,
        req.body.opponent,
    ]
    
    db.query(q, [...values, meetId], (error, data) => {
        if (error) return res.json(error);
        return res.json("Book has been updated");
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
        return res.json("Book has been deleted");
    });
});

app.listen(5000, () => {
    console.log("Connected to backend");
});