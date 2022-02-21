require("./mongodb");
const express = require("express");
const cors = require("cors");
const Utils = require("../helpers/utils");
const app = express();
const appApi = require("../components/index");

// middleware
app.use(cors());
app.use(express.json());
app.use(appApi);

app.use((req, res) => {
  res
    .status(500)
    .json({
      now: new Utils().rightNow(),
      status: 500,
      message: "route not found",
    });
});

module.exports = app;
