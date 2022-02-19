const BaseController = require("../base/controller");
const Service = require("./service");
const { responses } = require("../../libs/constants");

class Controller extends BaseController {
  constructor() {
    super();
    return this;
  }

  async create(req, res) {
    const survey = await new Service().respond(req, res);
    return survey
      ? this.sendResponse({ req, res, type: responses.SUCCESS, data: survey })
      : null;
  }

  async list(req, res) {
    const survey = await new Service().list(req, res);
    return survey
      ? this.sendResponse({ req, res, type: responses.SUCCESS, data: survey })
      : null;
  }
}

module.exports = Controller;
