const express = require("express");
const fs = require("fs");
const router = express.Router();
const Controler = require("./base/controller");
const { responses } = require("../libs/constants");

router.get("/", (req, res) =>
  new Controler().sendResponse({
    req,
    res,
    type: responses.SUCCESS,
    data: "SAMS API is running...",
  })
);

fs.readdir(__dirname, function (err, components) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  components.forEach(function (component) {
    try {
      if (fs.existsSync(`${__dirname}/${component}/router.js`)) {
        router.use(
          `/${component}`.toLowerCase(),
          require(`./${component}/router`)
        );
      }
    } catch (e) {
      console.log("error", e);
    }
  });
});

module.exports = router;
