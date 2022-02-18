const moment = require("moment");

class Utils {
  constructor() {
    return this;
  }

  rightNow() {
    return moment().format("YYYY-MM-DD :: hh:mm:ss");
  }
}

module.exports = Utils;
