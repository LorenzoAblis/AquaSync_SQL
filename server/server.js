const express = require("express");
const cors = require("cors");
const meetsRouter = require("./routes/meets");
const eventsRouter = require("./routes/events");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/meets", meetsRouter);
app.use("/events", eventsRouter);

app.listen(5000, () => {
    console.log("Connected to backend");
});