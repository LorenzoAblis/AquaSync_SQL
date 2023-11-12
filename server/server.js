const express = require("express");
const cors = require("cors");
const meetsRouter = require("./routes/meets");
const eventsRouter = require("./routes/events");
const signupRouter = require("./routes/signup");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/meets", meetsRouter);
app.use("/api/events", eventsRouter);
app.use("/api/auth/signup", signupRouter);

app.listen(5000, () => {
    console.log("Connected to backend");
});