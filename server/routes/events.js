const express = require("express");
const mysql = require("mysql");

const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

// Fetches all events for a meet
router.get("/:meetId", (req, res) => {
  const meetId = req.params.meetId;
  const q = "SELECT * FROM events WHERE meet_id = ?";

  db.query(q, [meetId], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// Fetches a single event
router.get("/:eventId", (req, res) => {
  const eventId = req.params.eventId;
  const q = "SELECT * FROM events WHERE event_id = ?";

  db.query(q, [eventId], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// Creates an event
router.post("/", (req, res) => {
  const q =
    "INSERT INTO events (`meet_id`, `stroke`, `distance`, `time`) VALUES (?)";
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

// Updates an event
router.put("/:eventId", (req, res) => {
  const eventId = req.params.eventId;
  const q =
    "UPDATE events SET `stroke` = ?, `distance` = ?, `time` = ? WHERE event_id = ?";
  const values = [req.body.stroke, req.body.distance, req.body.time];

  db.query(q, [...values, eventId], (error, data) => {
    if (error) return res.json(error);
    return res.json("Event has bee updated");
  });
});

// Deletes an event
router.delete("/:eventId", (req, res) => {
  const eventId = req.params.eventId;
  const q = "DELETE FROM events WHERE event_id = ?";

  db.query(q, [eventId], (error, data) => {
    if (error) return res.json(error);
    return res.json("Event Deleted");
  });
});

module.exports = router;
