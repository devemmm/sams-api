require("./mongodb");
const express = require("express");
const app = express();
const appApi = require("../components/index");

// middleware
app.use(express.json());
app.use(appApi);

app.use((req, res) => {
  res.json({ errorCode: 500, message: "not found" });
});

module.exports = app;
