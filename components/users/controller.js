const BaseController = require("../base/controller");
const Service = require("./service");
const { responses } = require("../../libs/constants");

class Controller extends BaseController {
  constructor() {
    super();
  }

  async signup(req, res) {
    const data = await new Service().signup(req, res);
    this.sendResponse({ req, res, type: responses.SUCCESS, data });
  }

  async signin(req, res) {
    const data = await new Service().signin(req, res);
    this.sendResponse({ req, res, type: responses.SUCCESS, data });
  }
}

module.exports = Controller;
