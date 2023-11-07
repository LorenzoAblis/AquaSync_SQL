const express = require("express");
const cors = require("cors");
const meetsRouter = require("./meets");
const eventsRouter = require("./events");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/meets", meetsRouter);
app.use("/events", eventsRouter);

// TODO: Install Higlight extension into vscode

app.listen(5000, () => {
    console.log("Connected to backend");
});