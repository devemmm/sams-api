const Service = require("./services");
const BaseController = require("../base/controller");
const { responses } = require("../../libs/constants");
class Controller extends BaseController {
  constructor() {
    super();
    return this;
  }

  async create(req, res) {
    const survey = await new Service().create(req, res);

    return survey
      ? this.sendResponse({ req, res, type: responses.SUCCESS, data: survey })
      : null;
  }

  async list(req, res) {
    const surveys = await new Service().list(req, res);

    return surveys
      ? this.sendResponse({ req, res, type: responses.SUCCESS, data: surveys })
      : null;
  }
}

module.exports = Controller;
